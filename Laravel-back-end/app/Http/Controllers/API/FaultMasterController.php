<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\FaultMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;

class FaultMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'type' => 'required|integer',
                        'title' => 'required|max:100',
                        'oem_id' => 'required|integer',
                        'bit_position' => 'required|integer'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            FaultMaster::create($post_data);
            return $this->sendResponse('Fault added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getFaultById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'fault_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $fault = FaultMaster::find($post_data['fault_master_id']);
            return $this->sendResponse('fault fetch successfully.',$fault);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'fault_master_id' => 'required|integer',        
                        'type' => 'required|integer',
                        'title' => 'required|max:100',
                        'oem_id' => 'required|integer',
                        'bit_position' => 'required|integer'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['fault_master_id'];
            FaultMaster::find($id)->update($post_data);

            return $this->sendResponse('Fault updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $fault_list = FaultMaster::where(['fault_master.is_active'=>1])->select('fault_master.*','oem_master.name as oem_name')
                                ->leftjoin('oem_master', 'fault_master.oem_id', '=', 'oem_master.oem_id');
            if($request->has('search_param') && $request->input('search_param')){
                $fault_list = $fault_list->where(function($query) use ($request){
                                $columns = ['fault_master.title','fault_master.bit_position','oem_master.name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $fault_list = $fault_list->orderBy('fault_master.id','DESC')->paginate(10);
            if(count($fault_list) > 0){
                return $this->sendResponse('Fault list fetch successfully.',$fault_list);
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
                'fault_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            FaultMaster::find($post_data['fault_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Fault deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
