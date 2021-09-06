<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\FleetOperatorMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class FleetOperatorController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'fleet_id' => 'max:100',        
                        'name' => 'required|max:100',
                        'address' => 'required|max:250',
                        'contact_person' => 'required|max:100',
                        'contact_email' => 'required|email|max:100',
                        'contact_number' => 'required|max:30',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
                        'users' => 'required',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $fleet_user = $post_data['users'];
            if(is_array($fleet_user) && count($fleet_user)){
                $post_data['created_by'] = Auth::user()->id;
                $fleet_operator_id = FleetOperatorMaster::create($post_data)->fleet_operator_id;

                $fleet_user_data = [];
                foreach($fleet_user as $user_id){
                    $fleet_user_data[] = ['fleet_operator_id' => $fleet_operator_id,'user_id' => $user_id];
                }
                DB::table('fleet_operator_user')->insert($fleet_user_data);
                return $this->sendResponse('Fleet Operator added successfully.');
            }else{
                return $this->sendError("Please select valid user.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getFleetOperatorById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'fleet_operator_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $id = $post_data['fleet_operator_id'];            
            $fleet_operator = FleetOperatorMaster::find($id);
            if($fleet_operator){
                $fleet_operator->users = DB::table('fleet_operator_user')->where(['fleet_operator_id' => $id])
                                            ->select('users.id','users.name')
                                            ->join('users', 'fleet_operator_user.user_id', '=', 'users.id')->get();
                return $this->sendResponse('Fleet Operator detail fetch successfully.',$fleet_operator);
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
                        'fleet_operator_id' => 'required|integer',
                        'fleet_id' => 'max:100',
                        'name' => 'required|max:100',
                        'address' => 'required|max:250',
                        'contact_person' => 'required|max:100',
                        'contact_email' => 'required|email|max:100',
                        'contact_number' => 'required|max:30',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
                        'users' => 'required',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $fleet_user = $post_data['users'];
            if(is_array($fleet_user) && count($fleet_user)){
                $id = $post_data['fleet_operator_id'];
                FleetOperatorMaster::find($id)->update($post_data);

                DB::table('fleet_operator_user')->where('fleet_operator_id',$id)->delete();
                $fleet_user_data = [];
                foreach($fleet_user as $user_id){
                    $fleet_user_data[] = ['fleet_operator_id' => $id,'user_id' => $user_id];
                }
                DB::table('fleet_operator_user')->insert($fleet_user_data);
                return $this->sendResponse('Fleet Operator updated successfully.');
            }else{
                return $this->sendError("Please select valid user.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $fleet_operator_list = FleetOperatorMaster::where(['fleet_operator_master.is_active'=>1])
                            ->select('fleet_operator_master.*',DB::raw('GROUP_CONCAT(users.name) AS users_name'))
                            ->join('fleet_operator_user', 'fleet_operator_master.fleet_operator_id', '=', 'fleet_operator_user.fleet_operator_id')
                            ->join('users', 'fleet_operator_user.user_id', '=', 'users.id');
            if($request->has('search_param') && $request->input('search_param')){
                $fleet_operator_list = $fleet_operator_list->where(function($query) use ($request){
                                            $columns = ['fleet_operator_master.name', 'fleet_operator_master.fleet_id', 'fleet_operator_master.address','fleet_operator_master.contact_person','fleet_operator_master.contact_email','fleet_operator_master.contact_number','fleet_operator_master.remark_1','fleet_operator_master.remark_2','users.name'];
                                            foreach($columns as $column){
                                                $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                            }
                                        });
            }
            $fleet_operator_list = $fleet_operator_list->groupBy('fleet_operator_user.fleet_operator_id')
                                        ->orderBy('fleet_operator_master.fleet_operator_id','DESC')->paginate(10);

            if(count($fleet_operator_list) > 0){
                return $this->sendResponse('Fleet Operator list fetch successfully.',$fleet_operator_list);
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
                'fleet_operator_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            FleetOperatorMaster::find($post_data['fleet_operator_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Fleet Operator deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
    public function getFleetOperator(Request $request) {
        try{
            $fleet_operator_list = FleetOperatorMaster::where(['is_active'=>1])
                            ->select('fleet_operator_id','name','fleet_id')
                            ->orderBy('name')->get();
            if(count($fleet_operator_list) > 0){
                return $this->sendResponse('Fleet Operator list fetch successfully.',$fleet_operator_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function getFleetOperatorByStation(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'hub_id' => 'required'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $data['mapped_fleet_operator'] = FleetOperatorMaster::where(['is_active'=>1])
                            ->where('hub_id',$post_data['hub_id'])
                            ->orderBy('name')->get();
            $data['other_fleet_operator'] = FleetOperatorMaster::where(['fleet_operator_master.is_active'=>1])
                            ->select('fleet_operator_id','fleet_operator_master.name','fleet_id','hub_master.name as hub_name')
                            ->where('hub_id','!=',$post_data['hub_id'])
                            ->leftjoin('hub_master', 'hub_master.hub_master_id', '=', 'fleet_operator_master.hub_id')
                            ->orderBy('fleet_operator_master.name')->get();
                            return $this->sendResponse('Fleet Operator list fetch successfully.',$data);            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
}
