<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\BatteryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class BatteryController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'oem_id' => 'required|integer',        
                        'model_name' => 'required|max:100',
                        'make_year' => 'required|max:100',
                        'type_of_connector' => 'required|max:100',
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
                $img_name = 'battery_'.time() . '.' . $file->getClientOriginalExtension();
                $destination_path = public_path('battery_master_files');
                $file->move($destination_path, $img_name);
                $post_data['file_name_path'] = '/battery_master_files/'.$img_name;
            }
            $post_data['created_by'] = Auth::user()->id;
            BatteryMaster::create($post_data);
            return $this->sendResponse('Battery added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getBatteryById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'battery_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $battery = BatteryMaster::select('battery_master.*','oem_master.name as oem_name')
                            ->where('battery_master_id',$post_data['battery_master_id'])            
                            ->join('oem_master', 'battery_master.oem_id', '=', 'oem_master.oem_id') 
                            ->first();
            if($battery){
                $battery->file_img = ($battery->file_name_path!="")?url('/').$battery->file_name_path:"";
            }
            return $this->sendResponse('battery fetch successfully.',$battery);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'battery_master_id' => 'required|integer',        
                        'oem_id' => 'required|integer',        
                        'model_name' => 'required|max:100',
                        'make_year' => 'required|max:100',
                        'type_of_connector' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
                        'img_file' => 'mimes:png,jpg,jpeg|max:2048'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $id = $post_data['battery_master_id'];
            $battery_data = BatteryMaster::find($id);
            if($battery_data){
                //remove previous file from server
                $post_data['file_name_path'] = (isset($post_data['file_name_path']))?trim($post_data['file_name_path']):"";
                if($post_data['file_name_path'] ==  "" && $battery_data->file_name_path!="" && file_exists(getcwd().'/'.$battery_data->file_name_path)) {
                    unlink(getcwd().'/' . $battery_data->file_name_path);
                }
                if ($request->hasFile('img_file')) {
                    $file = $request->file('img_file');
                    $img_name = 'battery_'.time() . '.' . $file->getClientOriginalExtension();
                    $destination_path = public_path('battery_master_files');
                    $file->move($destination_path, $img_name);
                    $post_data['file_name_path'] = '/battery_master_files/'.$img_name;
                }

                $id = $post_data['battery_master_id'];
                BatteryMaster::find($id)->update($post_data);
            }
            return $this->sendResponse('Battery updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $battery_list = BatteryMaster::where(['battery_master.is_active'=>1])->select('battery_master.*','oem_master.name as oem_name')
                            ->join('oem_master', 'battery_master.oem_id', '=', 'oem_master.oem_id');
            if($request->has('search_param') && $request->input('search_param')){
                $battery_list = $battery_list->where(function($query) use ($request)
                                {
                                    $columns = ['battery_master.model_name', 'battery_master.make_year', 'battery_master.type_of_connector','battery_master.remark_1','battery_master.remark_2','oem_master.name'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $battery_list = $battery_list->orderBy('battery_master.battery_master_id','DESC')->paginate(10);
            if(count($battery_list) > 0){
                foreach($battery_list as $row){
                    $row->file_img = ($row->file_name_path!="")?url('/').$row->file_name_path:"";
                }
                return $this->sendResponse('Battery list fetch successfully.',$battery_list);
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
                'battery_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            BatteryMaster::find($post_data['battery_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Battery deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getBatteryList(Request $request) {
        try{
            $data = BatteryMaster::orderBy('model_name')->orderBy('make_year')->where('is_active',1)
                        ->select('battery_master_id','model_name','make_year','type_of_connector')
                        ->get();
            return $this->sendResponse('Model list fetch successfully.',$data);         
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
