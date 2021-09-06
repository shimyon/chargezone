<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\BatteryInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class BatteryInventoryController extends BaseController {

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'battery_master_id' => 'required|integer',        
                        'serial_number' => 'required|max:100',
                        'hub_id' => 'integer',
                        'b_qr_code' => 'required|integer',
                        'own_by' => 'required|integer',
                        'bin' => 'required|max:100',
                        'imei' => 'required|max:100',
                        'soc' => 'required|max:100',
                        'bv' => 'required|max:100',
                        'rec' => 'required|max:100',
                        'remark' => 'max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            BatteryInventoryMaster::create($post_data);
            return $this->sendResponse('Battery added successfully in inventory.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getBatteryById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'battery_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $battery = BatteryInventoryMaster::find($post_data['battery_inventory_id']);
            return $this->sendResponse('battery fetch successfully.',$battery);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'battery_inventory_id' => 'required|integer',        
                        'battery_master_id' => 'required|integer',        
                        'serial_number' => 'required|max:100',
                        'hub_id' => 'integer',
                        'b_qr_code' => 'required|integer',
                        'own_by' => 'required|integer',
                        'bin' => 'required|max:100',
                        'imei' => 'required|max:100',
                        'soc' => 'required|max:100',
                        'bv' => 'required|max:100',
                        'rec' => 'required|max:100',
                        'remark' => 'max:100'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['battery_inventory_id'];
            BatteryInventoryMaster::find($id)->update($post_data);

            return $this->sendResponse('Battery updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $battery_list = BatteryInventoryMaster::where(['battery_inventory.is_active'=>1])
                            ->select('battery_inventory.*','battery_master.model_name','battery_master.make_year','oem_master.name as oem_name','hub_master.name as station_name','owner_master.name as owner_name')
                            ->join('battery_master', 'battery_inventory.battery_master_id', '=', 'battery_master.battery_master_id')                    
                            ->leftJoin('oem_master', 'oem_master.oem_id', '=', 'battery_master.oem_id')
                            ->leftJoin('hub_master', 'hub_master.hub_master_id', '=', 'battery_inventory.hub_id')
                            ->leftJoin('owner_master', 'owner_master.owner_master_id', '=', 'battery_inventory.own_by');
            if($request->has('search_param') && $request->input('search_param')){
                $battery_list = $battery_list->where(function($query) use ($request)
                                {
                                    $columns = ['battery_master.model_name', 'battery_master.make_year',
                                                 'oem_master.name','hub_master.name', 'owner_master.name',
                                                 'battery_inventory.serial_number','battery_inventory.b_qr_code','battery_inventory.bin',
                                                 'battery_inventory.imei','battery_inventory.soc','battery_inventory.bv',
                                                 'battery_inventory.rec','battery_inventory.remark'];
                                    foreach($columns as $column){
                                        $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                    }
                                });
            }
            $battery_list = $battery_list->orderBy('battery_inventory.battery_inventory_id','DESC')->paginate(10);
            if(count($battery_list) > 0){
                foreach($battery_list as $row){
                    $available_fault = DB::table('current_battery_fault_log')->where(['current_battery_fault_log.is_active' => 1,'current_battery_fault_log.battery_inventory_id'=>$row->battery_inventory_id])
                                            ->select('fault_master.id','fault_master.title')
                                            ->join('fault_master', 'fault_master.id', '=', 'current_battery_fault_log.fault_id')
                                            ->get();
                    $row->total_alarm = count($available_fault);
                    $row->alarm_list = $available_fault;
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
                'battery_inventory_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            BatteryInventoryMaster::find($post_data['battery_inventory_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Battery deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
