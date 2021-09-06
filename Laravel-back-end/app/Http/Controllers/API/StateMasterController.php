<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\StateMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class StateMasterController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'country_id' => 'required|integer',
                        'state_name' => 'required|max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            StateMaster::create($post_data);
            return $this->sendResponse('State added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getStateById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'state_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $state = StateMaster::find($post_data['state_master_id']);
            return $this->sendResponse('state fetch successfully.',$state);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'state_master_id' => 'required|integer',     
                        'country_id' => 'required|integer',   
                        'state_name' => 'required|max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['state_master_id'];
            StateMaster::find($id)->update($post_data);

            return $this->sendResponse('State updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $state_list = StateMaster::where(['state_master.is_active'=>1])->select('state_master.*','country_name')
                            ->join('country_master', 'country_master.id', '=', 'state_master.country_id');
            if($request->has('search_param') && $request->input('search_param')){
                $state_list = $state_list->where(function($query) use ($request){
                                $columns = ['state_name','country_name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $state_list = $state_list->orderBy('state_master.id','DESC')->paginate(10);
            if(count($state_list) > 0){
                return $this->sendResponse('State list fetch successfully.',$state_list);
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
                'state_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            StateMaster::find($post_data['state_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('State deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function getStateByCountry(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'country_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $state_list = StateMaster::where(['is_active'=>1,'country_id'=>$post_data['country_id']])->select('id','state_name')->orderBy('state_name')->get();
            if(count($state_list) > 0){
                return $this->sendResponse('State list fetch successfully.',$state_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
