<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class UserController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'name' => 'required',
                        'email' => 'required|email',
                        'username' => 'required|unique:users',
                        'password' => 'required',
                        'roles' => 'required',
                        'contact_number' => 'required',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $post_data['password'] = bcrypt($post_data['password']);
            $user = User::create($post_data);
            $user->assignRole($post_data['roles']);
            return $this->sendResponse('User added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
    public function roleList(Request $request) {
        try{
            $role_list = DB::table('roles')->select('id','name')->where('name','!=','API_User')->get();
            if(count($role_list) > 0){
                return $this->sendResponse('Roles fetch successfully.',$role_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getUserById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'user_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $user = User::find($post_data['user_id']);
            if($user){
                $user->roles = DB::table('model_has_roles')
                                ->where('model_id', $post_data['user_id'])->select('roles.id','roles.name')
                                ->leftjoin('roles', 'roles.id', '=', 'model_has_roles.role_id')->get();
                return $this->sendResponse('User fetch successfully.',$user);
            }else{
                return $this->sendError("Data not found.");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $id = $post_data['user_id'];                        
            $validator = Validator::make($post_data, [
                        'user_id' => 'required',        
                        'name' => 'required',
                        'email' => 'required|email',
                        'username' => 'required|unique:users,username,' . $id,
                        'roles' => 'required',
                        'contact_number' => 'required',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            if (!empty($post_data['password'])) {
                $post_data['password'] = bcrypt($post_data['password']);
                DB::table('oauth_access_tokens')->where(['user_id' => $id])->delete();
            } else {
                $post_data = Arr::except($post_data, array('password'));
            }
            $user = User::find($id);
            $user->update($post_data);

            DB::table('model_has_roles')->where('model_id', $id)->delete();
            $user = User::find($id);
            $user->assignRole($post_data['roles']);
            return $this->sendResponse('User updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $user_list = User::where(['is_active'=>1])
                                ->select('users.*',DB::raw("GROUP_CONCAT(roles.name) as role_name"))
                                ->whereNotIn('roles.name', ['API_User'])
                                ->leftjoin('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                                ->leftjoin('roles', 'roles.id', '=', 'model_has_roles.role_id');
            if($request->has('search_param') && $request->input('search_param')){
                $user_list = $user_list->where(function($query) use ($request)
                                {
                                    $columns = ['users.name', 'users.username', 'users.email','users.contact_number','roles.name'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $user_list = $user_list->groupBy('users.id')->orderBy('users.id','DESC')->paginate(10);

            if(count($user_list) > 0){
                return $this->sendResponse('User list fetch successfully.',$user_list);
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
                'user_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            User::where('id',$post_data['user_id'])->update(['is_active'=>0]);
            DB::table('oauth_access_tokens')->where(['user_id' => $post_data['user_id']])->delete();
            return $this->sendResponse('User deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getUsersByRole(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'user_role' => 'required'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $user_list = User::where(['users.is_active'=>1])
                                ->select('users.id','users.name')
                                ->where('roles.name', $post_data['user_role'])
                                ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                                ->get();

            if(count($user_list) > 0){
                return $this->sendResponse('User list fetch successfully.',$user_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getUsersByStation(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'hub_id' => 'required',
                'user_role' => 'required'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $role = DB::table('roles')->where('name',$post_data['user_role'])->first();

            if($role){
                $user_list = User::where(['users.is_active'=>1,'roles.id' => $role->id,'user_hub_log.hub_id' => $post_data['hub_id'],'user_hub_log.role_id' => $role->id])
                                ->select('users.id','users.name','users.email','users.contact_number')
                                ->join('user_hub_log', 'user_hub_log.user_id', '=', 'users.id')
                                ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                                ->get();
                $query = User::where(['users.is_active'=>1,'roles.id' => $role->id])
                                    ->select('users.id','users.name','hub_master.name as station_name')
                                    ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                                    ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')
                                    ->leftjoin('user_hub_log', 'user_hub_log.user_id', '=', 'users.id')
                                    ->leftjoin('hub_master', 'hub_master.hub_master_id', '=', 'user_hub_log.hub_id');
                                    
                if(count($user_list) > 0){
                    $user_array = array_column($user_list->toArray(),'id');
                    $query = $query->whereNotIn('users.id',$user_array);
                }
                $unmapped_user = $query->get();
                return $this->sendResponse('User list fetch successfully.',['mapped_user'=>$user_list,'other_user'=>$unmapped_user]);
            }else{
                return $this->sendError("User Role not found");
            }
                       
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getOperator(Request $request) {
        try{
            $user_list = User::where(['users.is_active'=>1,'roles.name' => 'Operator'])
                                ->select('users.id','users.name')
                                ->join('user_hub_log', 'user_hub_log.user_id', '=', 'users.id')
                                ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                                ->join('roles', 'roles.id', '=', 'model_has_roles.role_id');
            if($request->has('hub_id') && $request->input('hub_id')){
                $user_list = $user_list->where('user_hub_log.hub_id',$request->input('hub_id'));
            }
            $user_list = $user_list->get();
            if(count($user_list) > 0){
                return $this->sendResponse('User list fetch successfully.',$user_list);
            }else{
                return $this->sendError("Users not found");
            }
                       
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
