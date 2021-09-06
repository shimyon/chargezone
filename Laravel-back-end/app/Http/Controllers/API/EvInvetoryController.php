<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\EvInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class EvInvetoryController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'ev_master_id' => 'required|integer',
                        'e_qr_code' => 'required|integer',
                        'registration_no' => 'required|max:100',
                        'hub_id' => 'integer',
                        'vechicle_id' => 'required|integer',
                        'vehicle_vin' => 'required|max:100',
                        'fleet_owner_id' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['battery_id_1'] = 78;
            $post_data['battery_id_2'] = 78;
            $post_data['created_by'] = Auth::user()->id;
            EvInventoryMaster::create($post_data);
            return $this->sendResponse('EV added successfully in inventory.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getEvById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'ev_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $ev = EvInventoryMaster::find($post_data['ev_inventory_id']);
            return $this->sendResponse('EV fetch successfully.',$ev);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'ev_inventory_id' => 'required|integer',        
                        'ev_master_id' => 'required|integer',
                        'e_qr_code' => 'required|integer',
                        'registration_no' => 'required|max:100',
                        'hub_id' => 'integer',
                        'vechicle_id' => 'required|integer',
                        'vehicle_vin' => 'required|max:100',
                        'fleet_owner_id' => 'required|max:100',
                        'remark_1' => 'max:100',
                        'remark_2' => 'max:100',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['ev_inventory_id'];
            EvInventoryMaster::find($id)->update($post_data);

            return $this->sendResponse('EV updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $ev_list = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1])
                            ->select('ev_inventory_master.*','ev_master.vehicle_model','ev_master.vehicle_make','ev_master.vehicle_type','ev_master.battery_capacity','hub_master.name as station_name','fleet_operator_master.name as fleet_operator_name')
                            ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id')                
                            ->leftJoin('fleet_operator_master', 'fleet_operator_master.fleet_operator_id', '=', 'ev_inventory_master.fleet_owner_id')                
                            ->leftJoin('hub_master', 'hub_master.hub_master_id', '=', 'ev_inventory_master.hub_id');
            if($request->has('search_param') && $request->input('search_param')){
                $ev_list = $ev_list->where(function($query) use ($request)
                                {
                                    $columns = ['ev_master.vehicle_model', 'ev_master.battery_capacity', 'ev_master.vehicle_make','ev_master.vehicle_type','ev_inventory_master.e_qr_code','ev_inventory_master.registration_no','hub_master.name','ev_inventory_master.vechicle_id','ev_inventory_master.vehicle_vin','fleet_operator_master.name','ev_inventory_master.remark_1','ev_inventory_master.remark_2'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $ev_list = $ev_list->orderBy('ev_inventory_master.ev_inventory_id','DESC')->paginate(10);
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
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
                'ev_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            EvInventoryMaster::find($post_data['ev_inventory_id'])->update(['is_active'=>0]);
            return $this->sendResponse('EV deleted successfully from inventory.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getEvInventoryByStation(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'hub_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $ev_list = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1,'ev_inventory_master.hub_id'=>$post_data['hub_id']])
                            ->select('ev_inventory_master.ev_inventory_id','ev_inventory_master.e_qr_code','ev_inventory_master.registration_no','ev_inventory_master.vehicle_vin','ev_inventory_master.vechicle_id','ev_master.vehicle_model','ev_master.vehicle_make','ev_master.vehicle_type','ev_master.battery_capacity')
                            ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id')                
                            ->orderBy('ev_inventory_master.registration_no')->get();
                            
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getEvQrCode(Request $request) {
        try{
            $ev_list = EvInventoryMaster::where(['is_active'=>1])
                            ->select('ev_inventory_id','e_qr_code','registration_no','vehicle_vin');
            if($request->has('hub_id') && $request->input('hub_id')){
                $ev_list = $ev_list->where('hub_id',$request->input('hub_id'));
            }
            $ev_list = $ev_list->orderBy('e_qr_code')->get();         
            if(count($ev_list) > 0){
                return $this->sendResponse('EV list fetch successfully.',$ev_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
