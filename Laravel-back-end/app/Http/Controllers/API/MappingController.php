<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\EvInventoryMaster;
use App\Models\BatteryInventoryMaster;
use App\Models\ChargerInventoryMaster;
use App\Models\User;
use App\Models\FleetOperatorMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;

class MappingController extends BaseController {

    public function ev_list(Request $request) {
        try{
            $ev_list = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1])
                            ->select('ev_inventory_master.ev_inventory_id','ev_inventory_master.e_qr_code','ev_inventory_master.registration_no','ev_inventory_master.remark_1','ev_inventory_master.remark_2','ev_inventory_master.hub_id','hub_master.name as station_name','ev_master.vehicle_model','ev_master.vehicle_make','ev_master.vehicle_type')
                            ->leftJoin('hub_master', 'ev_inventory_master.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id');
            if($request->input('ev_type')=="Mapped EV"){
                $ev_list= $ev_list->where('ev_inventory_master.hub_id','>',0);
            }elseif($request->input('ev_type')=="Unmapped EV"){
                $ev_list= $ev_list->where('ev_inventory_master.hub_id','<=',0);
            }
            if($request->has('search_param') && $request->input('search_param')){
                $ev_list = $ev_list->where(function($query) use ($request){
                                $columns = ['ev_inventory_master.ev_inventory_id','ev_inventory_master.e_qr_code','ev_inventory_master.registration_no','ev_inventory_master.remark_1','ev_inventory_master.remark_2','ev_inventory_master.hub_id','hub_master.name','ev_master.vehicle_model','ev_master.vehicle_make','ev_master.vehicle_type'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $ev_list= $ev_list->orderBy('ev_inventory_master.ev_inventory_id','DESC')->paginate(10);
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function ev_mapping(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'ev_inventory_id' => 'required|integer',        
                'hub_id' => 'required|integer',
                'remark_1' => 'max:100',
                'remark_2' => 'max:100',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $ev_detail = EvInventoryMaster::find($post_data['ev_inventory_id']);

            if($ev_detail){
                $ev_detail->update($post_data);
                return $this->sendResponse('Ev Mapped successfully.');
            }else{
                return $this->sendError("Please Select Valid EV.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function battery_list(Request $request) {
        try{
            $battery_list = BatteryInventoryMaster::where(['battery_inventory.is_active'=>1])
                            ->select('battery_inventory_id','b_qr_code','serial_number','bin','soc','bv','ev_inventory_id','battery_inventory.remark','hub_id','hub_master.name as station_name')
                            ->leftJoin('hub_master', 'battery_inventory.hub_id', '=', 'hub_master.hub_master_id');
            if($request->input('battery_type')=="Mapped Battery"){
                $battery_list= $battery_list->where('battery_inventory.hub_id','>',0);
            }elseif($request->input('battery_type')=="Unmapped Battery"){
                $battery_list= $battery_list->where('battery_inventory.hub_id','<=',0);
            }
            if($request->has('search_param') && $request->input('search_param')){
                $battery_list = $battery_list->where(function($query) use ($request){
                                $columns = ['battery_inventory_id','b_qr_code','serial_number','bin','soc','bv','ev_inventory_id','battery_inventory.remark','hub_id','hub_master.name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $battery_list= $battery_list->orderBy('battery_inventory.battery_inventory_id','DESC')->paginate(10);
            if(count($battery_list) > 0){
                return $this->sendResponse('Battery list fetch successfully.',$battery_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function battery_mapping(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'battery_inventory_id' => 'required|integer',
                'ev_inventory_id' => 'integer',        
                'hub_id' => 'required|integer',
                'remark' => 'max:100'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $battery_detail = BatteryInventoryMaster::find($post_data['battery_inventory_id']);

            if($battery_detail){
                $ev_inventory_id = isset($post_data['ev_inventory_id'])?$post_data['ev_inventory_id']:0;
                if($battery_detail->hub_id!=$post_data['hub_id']){
                    $post_data['ev_inventory_id']= ($ev_inventory_id > 0 && $post_data['hub_id'] > 0)?$ev_inventory_id:0;
                }else{
                    if($ev_inventory_id <= 0){
                        $post_data = Arr::except($post_data, array('ev_inventory_id'));
                    }
                }
                $battery_detail->update($post_data);
                return $this->sendResponse('Battery Mapped successfully.');
            }else{
                return $this->sendError("Please Select Valid Battery.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function charger_list(Request $request) {
        try{
            $charger_list = ChargerInventoryMaster::where(['charger_inventory.is_active'=>1])
                                ->select('charger_inventory.id','charger_inventory.charger_id','charger_inventory.qr_code','charger_inventory.no_of_slot','charger_inventory.is_faulty','charger_inventory.remark_1','charger_inventory.remark_2','charger_master.make','charger_master.model','charger_master.dimension','charger_inventory.hub_id','hub_master.name as station_name','owner_master.name as owner_name')
                                ->join('charger_master', 'charger_inventory.charger_master_id', '=', 'charger_master.id')
                                ->leftJoin('hub_master', 'hub_master.hub_master_id', '=', 'charger_inventory.hub_id')
                                ->leftJoin('owner_master', 'owner_master.owner_master_id', '=', 'charger_inventory.own_by');

            if($request->input('charger_type')=="Mapped Charger"){
                $charger_list= $charger_list->where('charger_inventory.hub_id','>',0);
            }elseif($request->input('charger_type')=="Unmapped Charger"){
                $charger_list= $charger_list->where('charger_inventory.hub_id','<=',0);
            }
            if($request->has('search_param') && $request->input('search_param')){
                $charger_list = $charger_list->where(function($query) use ($request){
                                $columns = ['charger_inventory.id','charger_inventory.charger_id','charger_inventory.qr_code','charger_inventory.no_of_slot','charger_inventory.is_faulty','charger_inventory.remark_1','charger_inventory.remark_2','charger_master.make','charger_master.model','charger_master.dimension','charger_inventory.hub_id','hub_master.name','owner_master.name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $charger_list= $charger_list->orderBy('charger_inventory.id','DESC')->paginate(10);
            if(count($charger_list) > 0){
                return $this->sendResponse('Charger list fetch successfully.',$charger_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function charger_mapping(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'charger_inventory_id' => 'required|integer',        
                'hub_id' => 'required|integer',
                'remark_1' => 'max:100',
                'remark_2' => 'max:100',
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $charger_detail = ChargerInventoryMaster::find($post_data['charger_inventory_id']);

            if($charger_detail){
                $charger_detail->update($post_data);
                return $this->sendResponse('Charger Mapped successfully.');
            }else{
                return $this->sendError("Please Select Valid Charger.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function fleet_operator_mapping(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'fleet_operator_id' => 'required|integer',
                'hub_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $fleet_detail = FleetOperatorMaster::find($post_data['fleet_operator_id']);

            if($fleet_detail){
                $fleet_detail->update($post_data);
                return $this->sendResponse('Fleet Operator Mapped successfully.');
            }else{
                return $this->sendError("Please Select Valid Fleet Operator.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function user_mapping(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'user_id' => 'required|integer',
                'hub_id' => 'required|integer',
                'user_role' => 'required'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $role = User::where(['users.is_active'=>1,'roles.name' => $post_data['user_role'],'users.id' => $post_data['user_id']])
                        ->select('roles.id')
                        ->join('model_has_roles', 'model_has_roles.model_id', '=', 'users.id')
                        ->join('roles', 'roles.id', '=', 'model_has_roles.role_id')->first();
            if($role){
                if($post_data['hub_id'] > 0){
                    $user_hub_exists = DB::table('user_hub_log')->where(['role_id'=>$role->id,'user_id' => $post_data['user_id'],'hub_id' => $post_data['hub_id']])->first();
                    if(!$user_hub_exists){
                        DB::table('user_hub_log')->insert(['role_id'=>$role->id,'user_id' => $post_data['user_id'],'hub_id' => $post_data['hub_id']]);                    
                    }
                }else{
                    $user_hub_exists = DB::table('user_hub_log')->where(['role_id'=>$role->id,'user_id' => $post_data['user_id']])->delete();
                }                                
                return $this->sendResponse($post_data['user_role'].' mapped successfully.');
            }else{
                return $this->sendError("User not found with ".$post_data['user_role']." role.");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
