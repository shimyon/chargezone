<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\OwnerMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class OwnerMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'name' => 'required|max:100',
                        'remark' => 'max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            OwnerMaster::create($post_data);
            return $this->sendResponse('Owner added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getOwnerById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'owner_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $owner = OwnerMaster::find($post_data['owner_master_id']);
            return $this->sendResponse('owner fetch successfully.',$owner);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'owner_master_id' => 'required|integer',        
                        'name' => 'required|max:100',
                        'remark' => 'max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['owner_master_id'];
            OwnerMaster::find($id)->update($post_data);

            return $this->sendResponse('Owner updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $owner_list = OwnerMaster::where(['is_active'=>1]);
            if($request->has('search_param') && $request->input('search_param')){
                $owner_list = $owner_list->where(function($query) use ($request){
                                $columns = ['name','remark'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $owner_list = $owner_list->orderBy('owner_master_id','DESC')->paginate(10);
            if(count($owner_list) > 0){
                return $this->sendResponse('Owner list fetch successfully.',$owner_list);
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
                'owner_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            OwnerMaster::find($post_data['owner_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Owner deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function getOwners(Request $request) {
        try{
            $owner_list = OwnerMaster::where(['is_active'=>1])->select('owner_master_id','name')->orderBy('name')->get();
            if(count($owner_list) > 0){
                return $this->sendResponse('Owner list fetch successfully.',$owner_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
