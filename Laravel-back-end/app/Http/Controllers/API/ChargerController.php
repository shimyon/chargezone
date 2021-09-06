<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\ChargerMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class ChargerController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'oem_id' => 'required|integer',        
                        'make' => 'required|max:100',
                        'model' => 'required|max:100',
                        'dimension' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
                        'img_file' => 'mimes:png,jpg,jpeg|max:2048'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            if ($request->hasFile('img_file')) {
                $file = $request->file('img_file');
                $img_name = 'charger_'.time() . '.' . $file->getClientOriginalExtension();
                $destination_path = public_path('charger_master_files');
                $file->move($destination_path, $img_name);
                $post_data['file_name_path'] = '/charger_master_files/'.$img_name;
            }
            $post_data['created_by'] = Auth::user()->id;
            ChargerMaster::create($post_data);

            return $this->sendResponse('Charger added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getChargerById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'charger_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $charger = ChargerMaster::select('charger_master.*','oem_master.name as oem_name')
                            ->where('id',$post_data['charger_master_id'])            
                            ->join('oem_master', 'charger_master.oem_id', '=', 'oem_master.oem_id')
                            ->first();
            if($charger){
                $charger->file_img = ($charger->file_name_path!="")?url('/').$charger->file_name_path:"";
                return $this->sendResponse('Charger detail fetch successfully.',$charger);
            }else{
                return $this->sendError("Data not found");
            }
            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                    'charger_master_id' => 'required|integer',
                    'oem_id' => 'required|integer',
                    'make' => 'required|max:100',
                    'model' => 'required|max:100',
                    'dimension' => 'required|max:100',
                    'remark_1' => 'max:100',
                    'remark_2' => 'max:100',
                    'img_file' => 'mimes:png,jpg,jpeg|max:2048'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $id = $post_data['charger_master_id'];
            $charger_data = ChargerMaster::find($id);
            if($charger_data){
                //remove previous file from server
                $post_data['file_name_path'] = (isset($post_data['file_name_path']))?trim($post_data['file_name_path']):"";
                if($post_data['file_name_path'] ==  "" && $charger_data->file_name_path!="" && file_exists(getcwd().'/'.$charger_data->file_name_path)) {
                    unlink(getcwd().'/' . $charger_data->file_name_path);
                }
                if ($request->hasFile('img_file')) { 
                    $file = $request->file('img_file');
                    $img_name = 'charger_'.time() . '.' . $file->getClientOriginalExtension();
                    $destination_path = public_path('charger_master_files');
                    $file->move($destination_path, $img_name);
                    $post_data['file_name_path'] = '/charger_master_files/'.$img_name;
                }
                $id = $post_data['charger_master_id'];
                ChargerMaster::find($id)->update($post_data);
            }

            return $this->sendResponse('Charger updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $charger_list = ChargerMaster::where(['charger_master.is_active'=>1])->select('charger_master.*','oem_master.name as oem_name')
                                ->join('oem_master', 'charger_master.oem_id', '=', 'oem_master.oem_id'); 
            if($request->has('search_param') && $request->input('search_param')){
                $charger_list = $charger_list->where(function($query) use ($request)
                                {
                                    $columns = ['charger_master.make', 'charger_master.model', 'charger_master.dimension','charger_master.remark_1','charger_master.remark_2','oem_master.name'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $charger_list = $charger_list->orderBy('charger_master.id','DESC')->paginate(10);
            if(count($charger_list) > 0){
                foreach($charger_list as $row){
                    $row->file_img = ($row->file_name_path!="")?url('/').$row->file_name_path:"";
                }
                return $this->sendResponse('charger fetch successfully.',$charger_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function delete(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'charger_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            ChargerMaster::find($post_data['charger_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Charger deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getCharger(Request $request) {
        try{
            $charger_list = ChargerMaster::where(['is_active'=>1])
                            ->select('id','make','model','dimension')    
                            ->orderBy('make')->orderBy('model')->get();
            if(count($charger_list) > 0){
                return $this->sendResponse('charger fetch successfully.',$charger_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
