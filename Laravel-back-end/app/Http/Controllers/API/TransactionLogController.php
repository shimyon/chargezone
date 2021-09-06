<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\QueueMaster;
use App\Models\ChargerInventoryMaster;
use App\Models\HubMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;

class TransactionLogController extends BaseController {

    public function transaction_list(Request $request) {
        try{
            $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1])
                            ->where('transaction_log.status','<=',7)
                            ->select('transaction_log.*','hub_master.name as station_name','users.name as operator')
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('users', 'transaction_log.created_by', '=', 'users.id');
            if($request->has('search_param') && $request->input('search_param')){
                $transaction_list = $transaction_list->where(function($query) use ($request){
                                $columns = ['hub_master.name','users.name','transaction_log.vehicle_vin',
                                        'discharged_battery_bin_1','discharged_battery_bin_2','charged_battery_bin_1',
                                        'charged_battery_bin_2','discharged_battery_soc_1','discharged_battery_soc_2',
                                        'charged_battery_soc_1','charged_battery_soc_2','discharged_battery_bv_1',
                                        'discharged_battery_bv_2','charged_battery_bv_1','charged_battery_bv_2',
                                        'discharged_battery_rec_1','discharged_battery_rec_2','charged_battery_rec_1',
                                        'charged_battery_rec_2'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $transaction_list = $transaction_list->orderBy('transaction_log_id','DESC')->paginate(10);
            if(count($transaction_list) > 0){
                return $this->sendResponse('Transaction list fetch successfully.',$transaction_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }    

    public function queue_list(Request $request) {
        try{
            $queue_list = QueueMaster::where(['queue_master.is_active'=>1])
                            ->select('queue_master.*','hub_master.name as station_name','users.name as operator')
                            ->join('hub_master', 'queue_master.hub_id', '=', 'hub_master.hub_master_id')                
                            ->leftJoin('users', 'queue_master.created_by', '=', 'users.id');
            if($request->has('search_param') && $request->input('search_param')){
                $queue_list = $queue_list->where(function($query) use ($request){
                                $columns = ['hub_master.name','users.name','queue_master.vehicle_vin','e_qr_code','vechicle_id','registration_no'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $queue_list = $queue_list->orderBy('queue_master_id','DESC')->paginate(10);
            if(count($queue_list) > 0){
                return $this->sendResponse('Queue list fetch successfully.',$queue_list);
            }else{
                return $this->sendError("Data not found");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }    

    public function getChargerByStation(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                    'hub_id' => 'required|integer'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $charger_list = ChargerInventoryMaster::select('id','charger_id','qr_code','no_of_slot','is_faulty')->where(['hub_id' => $post_data['hub_id'],'is_active'=>1])->get();
            if(count($charger_list) > 0){
                foreach($charger_list as $row){
                    $row->available_slot = DB::table('charger_slot')->where(['charger_inventory_id' => $row->id,'is_faulty'=>0,'in_use'=>0,'in_charging'=>0,'is_active' => 1])->count();
                    $row->faulted_slot = DB::table('charger_slot')->where(['charger_inventory_id' => $row->id,'is_faulty'=>1,'is_active' => 1])->count();
                    $row->busy_slot = DB::table('charger_slot')->where(['charger_inventory_id' => $row->id,'in_use'=>1,'in_charging'=>0,'is_faulty'=>0,'is_active' => 1])->count();
                    $row->in_charging_slot = DB::table('charger_slot')->where(['charger_inventory_id' => $row->id,'in_charging'=>1,'is_faulty'=>0,'is_active' => 1])->count();
                    $available_fault = DB::table('current_charger_fault_log')->where(['current_charger_fault_log.is_active' => 1,'current_charger_fault_log.charger_inventory_id'=>$row->id])
                                            ->select('fault_master.id','fault_master.title')
                                            ->join('fault_master', 'fault_master.id', '=', 'current_charger_fault_log.fault_id')
                                            ->get();
                    $row->total_alarm = count($available_fault);
                    $row->alarm_list = $available_fault;
                }
                return $this->sendResponse('Charger list fetch successfully.',$charger_list);
            }else{
                return $this->sendError("Data not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getSlotByCharger(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                    'charger_inventory_id' => 'required|integer'
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            $slot_list = DB::table('charger_slot')                
                            ->where(['charger_inventory_id' => $post_data['charger_inventory_id'],'is_active' => 1])                          
                            ->get();
            if(count($slot_list) > 0){
                foreach($slot_list as $row){
                    $available_fault = DB::table('current_connector_fault_log')->where(['current_connector_fault_log.is_active' => 1,'current_connector_fault_log.connector_inventory_id'=>$row->id])
                                            ->select('fault_master.id','fault_master.title')
                                            ->join('fault_master', 'fault_master.id', '=', 'current_connector_fault_log.fault_id')
                                            ->get();
                    $row->total_alarm = count($available_fault);
                    $row->alarm_list = $available_fault;
                }
                return $this->sendResponse('Slot list fetch successfully.',$slot_list);
            }else{
                return $this->sendError("Data not found");
            }
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
}
