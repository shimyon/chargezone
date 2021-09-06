<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\OemMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class OemController extends BaseController {

    public function getOem(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'type' => 'required|integer',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $oem_list = OemMaster::where(['is_active'=>1,'type'=>$post_data['type']])
                            ->select('oem_id','name')->orderBy('name')->get();
            if(count($oem_list) > 0){
                return $this->sendResponse('Oem list fetch successfully.',$oem_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'type' => 'required|integer',        
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
            $oem_user = $post_data['users'];
            if(is_array($oem_user) && count($oem_user)){
                $post_data['created_by'] = Auth::user()->id;
                $oem_id = OemMaster::create($post_data)->oem_id;

                $oem_user_data = [];
                foreach($oem_user as $user_id){
                    $oem_user_data[] = ['oem_id' => $oem_id,'user_id' => $user_id];
                }
                DB::table('oem_user')->insert($oem_user_data);
                return $this->sendResponse('Oem added successfully.');
            }else{
                return $this->sendError("Please select valid user.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getOemById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'oem_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $id = $post_data['oem_id'];            
            $oem = OemMaster::find($id);
            if($oem){
                $oem->users = DB::table('oem_user')->where(['oem_user.oem_id' => $id])->select('users.id','users.name')
                        ->join('users', 'oem_user.user_id', '=', 'users.id')->get();
                return $this->sendResponse('Oem detail fetch successfully.',$oem);
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
                        'oem_id' => 'required|integer',        
                        'type' => 'required|integer',
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

            $oem_user = $post_data['users'];
            if(is_array($oem_user) && count($oem_user)){
                $id = $post_data['oem_id'];
                OemMaster::find($id)->update($post_data);

                DB::table('oem_user')->where('oem_id',$id)->delete();
                $oem_user_data = [];
                foreach($oem_user as $user_id){
                    $oem_user_data[] = ['oem_id' => $id,'user_id' => $user_id];
                }
                DB::table('oem_user')->insert($oem_user_data);
                return $this->sendResponse('Oem updated successfully.');
            }else{
                return $this->sendError("Please select valid user.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $oem_list = OemMaster::where(['oem_master.is_active'=>1])
                            ->select('oem_master.*',DB::raw('GROUP_CONCAT(users.name) AS users_name'))
                            ->join('oem_user', 'oem_master.oem_id', '=', 'oem_user.oem_id')
                            ->join('users', 'oem_user.user_id', '=', 'users.id');
            
            if($request->has('search_param') && $request->input('search_param')){
                $oem_list = $oem_list->where(function($query) use ($request)
                            {
                                $columns = ['oem_master.name', 'oem_master.address','oem_master.contact_person','oem_master.contact_email','oem_master.contact_number','oem_master.remark_1','oem_master.remark_2','users.name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $oem_list = $oem_list->groupBy('oem_user.oem_id')
                                ->orderBy('oem_master.oem_id','DESC')->paginate(10);
            if(count($oem_list) > 0){
                return $this->sendResponse('Oem list fetch successfully.',$oem_list);
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
                'oem_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            OemMaster::find($post_data['oem_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Oem deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
