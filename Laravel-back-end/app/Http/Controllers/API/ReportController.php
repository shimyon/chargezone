<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\QueueMaster;
use App\Models\ChargerInventoryMaster;
use App\Models\HubMaster;
use App\Models\EvInventoryMaster;
use App\Models\BatteryInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BatteryLogExport;
use App\Exports\SwappingTransactionExport;
use App\Exports\BssNetworkExport;
use App\Exports\FaultLogReportExport;
use App\Exports\SwapReportExport;
use App\Exports\WeeklyBillingReportExport;
use Illuminate\Support\Facades\Storage;

class ReportController extends BaseController {

    public function swapping_transaction(Request $request) {
        try{

            $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
            $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1])
                            ->where('transaction_log.status',7)
                            ->select(
                                'hub_master.name as station_name'
                                ,'users.name as operator'
                                ,'users.name as operator'
                                ,DB::raw('ifnull((transaction_log.discharged_battery_bv_1 * transaction_log.discharged_battery_rec_1) / 1000,0) as discharge1_kwh')
                                ,DB::raw('ifnull((transaction_log.charged_battery_bv_1 * transaction_log.charged_battery_rec_1) / 1000,0) as charge1_kwh')
                                ,DB::raw('ifnull((transaction_log.discharged_battery_bv_2 * transaction_log.discharged_battery_rec_2) / 1000,0) as discharge2_kwh')
                                ,DB::raw('ifnull((transaction_log.charged_battery_bv_2 * transaction_log.charged_battery_rec_2) / 1000,0) as charge2_kwh')
                                ,DB::raw('ifnull(TIMESTAMPDIFF(MINUTE, transaction_log.start_time, transaction_log.end_time),0) as diff_time')
                                ,'transaction_log.*'
                                ,'fleet_operator_master.name as fleet_operator_name')
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('users', 'transaction_log.created_by', '=', 'users.id')
                            ->leftJoin('ev_inventory_master', 'transaction_log.ev_inventory_id', '=', 'ev_inventory_master.ev_inventory_id')
                            ->leftJoin('fleet_operator_master', 'fleet_operator_master.fleet_operator_id', '=', 'ev_inventory_master.fleet_owner_id');
            if($request->has('country_id') && $request->input('country_id')){
                $transaction_list = $transaction_list->where('hub_master.country_id',$request->input('country_id'));
            }
            if($request->has('state_id') && $request->input('state_id')){
                $transaction_list = $transaction_list->where('hub_master.state_id',$request->input('state_id'));
            }
            if($request->has('city_id') && $request->input('city_id')){
                $transaction_list = $transaction_list->where('hub_master.city_id',$request->input('city_id'));
            }
            if($request->has('hub_id') && $request->input('hub_id')){
                $transaction_list = $transaction_list->where('transaction_log.hub_id',$request->input('hub_id'));
            }
            if($request->has('operator_id') && $request->input('operator_id')){
                $transaction_list = $transaction_list->where('ev_inventory_master.fleet_owner_id',$request->input('operator_id'));
            }
            if($request->has('ev_qr_code') && $request->input('ev_qr_code')){
                $transaction_list = $transaction_list->where('transaction_log.e_qr_code', 'like', '%'.$request->input('ev_qr_code').'%');
            }
            if ($request->input('from_date') && $request->input('to_date')) {
                $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                $transaction_list = $transaction_list->whereBetween('transaction_log.updated_at', array($from_date, $to_date));
            }
            $transaction_list = $transaction_list->orderBy('transaction_log_id','DESC')->paginate(10);
            if(count($transaction_list) > 0){
                return $this->sendResponse('Transaction list fetch successfully.',$transaction_list);
            }else{
                return $this->sendError("Data not found");
            }            
        }     
        else
        {

            $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1, 'user_hub_log.user_id'=>$user->id])
                            ->where('transaction_log.status',7)
                            ->select('hub_master.name as station_name','users.name as operator','transaction_log.*','fleet_operator_master.name as fleet_operator_name')
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('users', 'transaction_log.created_by', '=', 'users.id')
                            ->Join('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->leftJoin('ev_inventory_master', 'transaction_log.ev_inventory_id', '=', 'ev_inventory_master.ev_inventory_id')
                            ->leftJoin('fleet_operator_master', 'fleet_operator_master.fleet_operator_id', '=', 'ev_inventory_master.fleet_owner_id');
            if($request->has('country_id') && $request->input('country_id')){
                $transaction_list = $transaction_list->where('hub_master.country_id',$request->input('country_id'));
            }
            if($request->has('state_id') && $request->input('state_id')){
                $transaction_list = $transaction_list->where('hub_master.state_id',$request->input('state_id'));
            }
            if($request->has('city_id') && $request->input('city_id')){
                $transaction_list = $transaction_list->where('hub_master.city_id',$request->input('city_id'));
            }
            if($request->has('hub_id') && $request->input('hub_id')){
                $transaction_list = $transaction_list->where('transaction_log.hub_id',$request->input('hub_id'));
            }
            if($request->has('operator_id') && $request->input('operator_id')){
                $transaction_list = $transaction_list->where('ev_inventory_master.fleet_owner_id',$request->input('operator_id'));
            }
            if($request->has('ev_qr_code') && $request->input('ev_qr_code')){
                $transaction_list = $transaction_list->where('transaction_log.e_qr_code', 'like', '%'.$request->input('ev_qr_code').'%');
            }
            if ($request->input('from_date') && $request->input('to_date')) {
                $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                $transaction_list = $transaction_list->whereBetween('transaction_log.updated_at', array($from_date, $to_date));
            }
            $transaction_list = $transaction_list->orderBy('transaction_log_id','DESC')->paginate(10);
            if(count($transaction_list) > 0){
                return $this->sendResponse('Transaction list fetch successfully.',$transaction_list);
            }else{
                return $this->sendError("Data not found");
            }            
        
        }

        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function swap_report(Request $request) {
        try{

              $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
            $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1])
                            ->where('transaction_log.status',7)
                            ->select('hub_master.name as station_name','users.name as operator','transaction_log.e_qr_code',DB::raw('count(*) as total'))
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('users', 'transaction_log.created_by', '=', 'users.id');
                            
            if($request->has('country_id') && $request->input('country_id')){
                $transaction_list = $transaction_list->where('hub_master.country_id',$request->input('country_id'));
            }
            if($request->has('state_id') && $request->input('state_id')){
                $transaction_list = $transaction_list->where('hub_master.state_id',$request->input('state_id'));
            }
            if($request->has('city_id') && $request->input('city_id')){
                $transaction_list = $transaction_list->where('hub_master.city_id',$request->input('city_id'));
            }
            if($request->has('hub_id') && $request->input('hub_id')){
                $transaction_list = $transaction_list->where('transaction_log.hub_id',$request->input('hub_id'));
            }
            if($request->has('operator_id') && $request->input('operator_id')){
                $transaction_list = $transaction_list->where('transaction_log.created_by',$request->input('operator_id'));
            }
            if($request->has('ev_qr_code') && $request->input('ev_qr_code')){
                $transaction_list = $transaction_list->where('transaction_log.e_qr_code', 'like', '%'.$request->input('ev_qr_code').'%');
            }
            if ($request->input('from_date') && $request->input('to_date')) {
                $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                $transaction_list = $transaction_list->whereBetween('transaction_log.created_at', array($from_date, $to_date));
            }
            $transaction_list = $transaction_list->groupBy(['transaction_log.e_qr_code','transaction_log.created_by','transaction_log.hub_id'])->paginate(10);
            if(count($transaction_list) > 0){
                return $this->sendResponse('Transaction list fetch successfully.',$transaction_list);
            }else{
                return $this->sendError("Data not found");
            }  
        }
        else
        {

            $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1,'user_hub_log.user_id'=>$user->id])
            ->where('transaction_log.status',7)
            ->select('hub_master.name as station_name','users.name as operator','transaction_log.e_qr_code',DB::raw('count(*) as total'))
            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
            ->Join('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
             ->join('users', 'transaction_log.created_by', '=', 'users.id');
            
                    if($request->has('country_id') && $request->input('country_id')){
                    $transaction_list = $transaction_list->where('hub_master.country_id',$request->input('country_id'));
                    }
                    if($request->has('state_id') && $request->input('state_id')){
                    $transaction_list = $transaction_list->where('hub_master.state_id',$request->input('state_id'));
                    }
                    if($request->has('city_id') && $request->input('city_id')){
                    $transaction_list = $transaction_list->where('hub_master.city_id',$request->input('city_id'));
                    }
                    if($request->has('hub_id') && $request->input('hub_id')){
                    $transaction_list = $transaction_list->where('transaction_log.hub_id',$request->input('hub_id'));
                    }
                    if($request->has('operator_id') && $request->input('operator_id')){
                    $transaction_list = $transaction_list->where('transaction_log.created_by',$request->input('operator_id'));
                    }
                    if($request->has('ev_qr_code') && $request->input('ev_qr_code')){
                    $transaction_list = $transaction_list->where('transaction_log.e_qr_code', 'like', '%'.$request->input('ev_qr_code').'%');
                    }
                    if ($request->input('from_date') && $request->input('to_date')) {
                    $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                    $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                    $transaction_list = $transaction_list->whereBetween('transaction_log.created_at', array($from_date, $to_date));
                    }
                    $transaction_list = $transaction_list->groupBy(['transaction_log.e_qr_code','transaction_log.created_by','transaction_log.hub_id'])->paginate(10);
                    if(count($transaction_list) > 0){
                    return $this->sendResponse('Transaction list fetch successfully.',$transaction_list);
                    }else{
                    return $this->sendError("Data not found");
                  }  
             }    

        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function bss_network_report(Request $request) {
        try{
             $user = Auth::user();
             if($user->hasRole(['Admin', 'Super Admin', 'Manager'])){
                $hub_list = HubMaster::where(['hub_master.is_active'=>1 ])
                    ->select('hub_master.hub_master_id','country_name','state_name','city_name','hub_master.name as hub_name','hub_master.address')
                            ->leftjoin('country_master', 'country_master.id', '=', 'hub_master.country_id')
                            ->leftjoin('state_master', 'state_master.id', '=', 'hub_master.state_id')
                            ->leftjoin('city_master', 'city_master.id', '=', 'hub_master.city_id');
       
                if($request->has('country_id') && $request->input('country_id')){
                    $hub_list = $hub_list->where('hub_master.country_id',$request->input('country_id'));
                }
                if($request->has('state_id') && $request->input('state_id')){
                    $hub_list = $hub_list->where('hub_master.state_id',$request->input('state_id'));
                }
                if($request->has('city_id') && $request->input('city_id')){
                    $hub_list = $hub_list->where('hub_master.city_id',$request->input('city_id'));
                }
                if($request->has('hub_id') && $request->input('hub_id')){
                    $hub_list = $hub_list->where('hub_master.hub_master_id',$request->input('hub_id'));
                }
                // if ($request->input('from_date') && $request->input('to_date')) {
                //     $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                //     $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                //     $hub_list = $hub_list->whereBetween('hub_master.created_at', array($from_date, $to_date));
                // }
                $hub_list = $hub_list->orderBy('hub_master.name')->paginate(10);

                foreach($hub_list as $row){
                    $row->total_ev = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1,'ev_inventory_master.hub_id' => $row->hub_master_id])
                                ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id')->count();

                    $row->total_batteries =  BatteryInventoryMaster::where(['battery_inventory.is_active'=>1,'battery_inventory.hub_id' => $row->hub_master_id])
                                ->join('battery_master', 'battery_inventory.battery_master_id', '=', 'battery_master.battery_master_id')->count();

                    $row->total_charger = ChargerInventoryMaster::where(['charger_inventory.is_active'=>1,'charger_inventory.hub_id' => $row->hub_master_id])
                                ->join('charger_master', 'charger_inventory.charger_master_id', '=', 'charger_master.id')->count();

                    $row->total_connector =  DB::table('charger_slot')->where(['is_active'=>1,'hub_id' => $row->hub_master_id])->count();
                }
                if(count($hub_list) > 0){
                    return $this->sendResponse('Station list fetch successfully.',$hub_list);
                }else{
                    return $this->sendError("Data not found");
                }       
             }
             else{
            //     return $this->sendError("Please select hubs");
                 

                         $hub_list = HubMaster::where(['hub_master.is_active'=>1,'user_hub_log.user_id'=>$user->id ])
                    ->select('hub_master.hub_master_id','country_name','state_name','city_name','hub_master.name as hub_name','hub_master.address')
                            ->Join('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->leftjoin('country_master', 'country_master.id', '=', 'hub_master.country_id')
                            ->leftjoin('state_master', 'state_master.id', '=', 'hub_master.state_id')
                            ->leftjoin('city_master', 'city_master.id', '=', 'hub_master.city_id');
       
                if($request->has('country_id') && $request->input('country_id')){
                    $hub_list = $hub_list->where('hub_master.country_id',$request->input('country_id'));
                }
                if($request->has('state_id') && $request->input('state_id')){
                    $hub_list = $hub_list->where('hub_master.state_id',$request->input('state_id'));
                }
                if($request->has('city_id') && $request->input('city_id')){
                    $hub_list = $hub_list->where('hub_master.city_id',$request->input('city_id'));
                }
                if($request->has('hub_id') && $request->input('hub_id')){
                    $hub_list = $hub_list->where('hub_master.hub_master_id',$request->input('hub_id'));
                }
                // if ($request->input('from_date') && $request->input('to_date')) {
                //     $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                //     $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                //     $hub_list = $hub_list->whereBetween('hub_master.created_at', array($from_date, $to_date));
                // }
                $hub_list = $hub_list->orderBy('hub_master.name')->paginate(10);

                foreach($hub_list as $row){
                    $row->total_ev = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1,'ev_inventory_master.hub_id' => $row->hub_master_id])
                                ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id')->count();

                    $row->total_batteries =  BatteryInventoryMaster::where(['battery_inventory.is_active'=>1,'battery_inventory.hub_id' => $row->hub_master_id])
                                ->join('battery_master', 'battery_inventory.battery_master_id', '=', 'battery_master.battery_master_id')->count();

                    $row->total_charger = ChargerInventoryMaster::where(['charger_inventory.is_active'=>1,'charger_inventory.hub_id' => $row->hub_master_id])
                                ->join('charger_master', 'charger_inventory.charger_master_id', '=', 'charger_master.id')->count();

                    $row->total_connector =  DB::table('charger_slot')->where(['is_active'=>1,'hub_id' => $row->hub_master_id])->count();
                }
                if(count($hub_list) > 0){
                    return $this->sendResponse('Station list fetch successfully.',$hub_list);
                }else{
                    return $this->sendError("Data not found");
                }       

             }       
        
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function weekly_billing_ref(Request $request) {
        try{
            
            $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
            $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d');
            $start_time = Carbon::parse($request->input('from_date'))->format('H:i:s');
            $to_date = Carbon::parse($request->input('from_date'))->addDay(6)->format('Y-m-d');
            $end_time = Carbon::parse($request->input('to_date'))->format('H:i:s');
            
            $dateRange = \Carbon\CarbonPeriod::create($from_date, $to_date);

            $dates = [];
            $disp_date = [];
            foreach($dateRange as $date) {
                $dates[] = $date->format('Y-m-d');
                $disp_date[] = $date->format('d/m/Y');
            }
            $ev_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1,'transaction_log.status'=>7])
                            ->select('transaction_log.e_qr_code','hub_master.name as station_name')
                            ->whereBetween('transaction_log.created_at', array($from_date.' '.$start_time, $to_date.' '.$end_time))
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id');
            if($request->has('hub_id') && $request->input('hub_id')){
                $ev_list = $ev_list->where('transaction_log.hub_id',$request->input('hub_id'));
            }
            $ev_list = $ev_list->groupBy('transaction_log.e_qr_code')->orderBy('transaction_log.e_qr_code')->paginate(10);
            $report_data = [];
            $report_data['data']['selected_week_dates'] = $disp_date;
            $report_data['current_page'] = $ev_list->currentPage();
            $report_data['last_page'] = $ev_list->lastPage();
            $report_data['total'] = $ev_list->total();
            if(count($ev_list) > 0 && count($dates) > 0){
                foreach($ev_list as $ev_code){
                    $energy_data=[];
                    $energy_data['e_qr_code'] = $ev_code->e_qr_code;
                    $energy_data['station_name'] = $ev_code->station_name;
                    $day = 1;
                    $energy_sum = 0;
                    foreach($dates as $swap_date){
                        $e_date = Carbon::parse($swap_date)->addDay()->format('Y-m-d')." ".$end_time;
                        $energy = round(DB::table('transaction_log')->where(['status' => 7,'e_qr_code' => $ev_code->e_qr_code])
                                    ->whereBetween('created_at', array($swap_date." ".$start_time, $e_date))
                                    ->sum(DB::raw('((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2))')),2);
                        $energy_data['Day_'.$day] = $energy;
                        $day++;
                        $energy_sum += $energy;
                    }    
                    $energy_data['total_energy_supp'] = round($energy_sum,2);
                    $energy_data['total_bill_amount'] = round($energy_sum*25.47,2);  
                    $report_data['data']['energy_data'][] = $energy_data;           
                }

                return $this->sendResponse('Station list fetch successfully.',$report_data);
            }else{
                return $this->sendError("Data not found");
            }   
        }
        else
         {

            $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d');
            $start_time = Carbon::parse($request->input('from_date'))->format('H:i:s');
            $to_date = Carbon::parse($request->input('from_date'))->addDay(6)->format('Y-m-d');
            $end_time = Carbon::parse($request->input('to_date'))->format('H:i:s');
            
            $dateRange = \Carbon\CarbonPeriod::create($from_date, $to_date);

            $dates = [];
            $disp_date = [];
            foreach($dateRange as $date) {
                $dates[] = $date->format('Y-m-d');
                $disp_date[] = $date->format('d/m/Y');
            }
            $ev_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1,'transaction_log.status'=>7,'user_hub_log.user_id'=>$user->id])
                            ->select('transaction_log.e_qr_code','hub_master.name as station_name')
                            ->whereBetween('transaction_log.created_at', array($from_date.' '.$start_time, $to_date.' '.$end_time))
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->Join('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id');
            if($request->has('hub_id') && $request->input('hub_id')){
                $ev_list = $ev_list->where('transaction_log.hub_id',$request->input('hub_id'));
            }
            $ev_list = $ev_list->groupBy('transaction_log.e_qr_code')->orderBy('transaction_log.e_qr_code')->paginate(10);
            $report_data = [];
            $report_data['data']['selected_week_dates'] = $disp_date;
            $report_data['current_page'] = $ev_list->currentPage();
            $report_data['last_page'] = $ev_list->lastPage();
            $report_data['total'] = $ev_list->total();
            if(count($ev_list) > 0 && count($dates) > 0){
                foreach($ev_list as $ev_code){
                    $energy_data=[];
                    $energy_data['e_qr_code'] = $ev_code->e_qr_code;
                    $energy_data['station_name'] = $ev_code->station_name;
                    $day = 1;
                    $energy_sum = 0;
                    foreach($dates as $swap_date){
                        $e_date = Carbon::parse($swap_date)->addDay()->format('Y-m-d')." ".$end_time;
                        $energy = round(DB::table('transaction_log')->where(['status' => 7,'e_qr_code' => $ev_code->e_qr_code])
                                    ->whereBetween('created_at', array($swap_date." ".$start_time, $e_date))
                                    ->sum(DB::raw('((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2))')),2);
                        $energy_data['Day_'.$day] = $energy;
                        $day++;
                        $energy_sum += $energy;
                    }    
                    $energy_data['total_energy_supp'] = round($energy_sum,2);
                    $energy_data['total_bill_amount'] = round($energy_sum*25.47,2);  
                    $report_data['data']['energy_data'][] = $energy_data;           
                }

                return $this->sendResponse('Station list fetch successfully.',$report_data);
            }else{
                return $this->sendError("Data not found");
            }  

         }
            

        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    public function fault_report(Request $request) {
        try{
            $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
            $fault_list = DB::table('fault_history_log')->where(['fault_history_log.is_active'=>1])
                            ->select('hub_master.name as station_name','fault_history_log.id','fault_history_log.bin','fault_history_log.charger_id','fault_history_log.connector_id','fault_history_log.alarms')
                            ->addSelect(DB::raw('DATE_FORMAT(fault_history_log.created_at, "%d/%m/%Y") as occur_date'),DB::raw('DATE_FORMAT(fault_history_log.created_at, "%h:%i %p") as occur_time'))
                            ->join('hub_master', 'fault_history_log.hub_id', '=', 'hub_master.hub_master_id');
            if($request->has('country_id') && $request->input('country_id')){
                $fault_list = $fault_list->where('hub_master.country_id',$request->input('country_id'));
            }
            if($request->has('state_id') && $request->input('state_id')){
                $fault_list = $fault_list->where('hub_master.state_id',$request->input('state_id'));
            }
            if($request->has('city_id') && $request->input('city_id')){
                $fault_list = $fault_list->where('hub_master.city_id',$request->input('city_id'));
            }
            if($request->has('hub_id') && $request->input('hub_id')){
                $fault_list = $fault_list->where('fault_history_log.hub_id',$request->input('hub_id'));
            }
            if($request->has('owner_id') && $request->input('owner_id')){
                $fault_list = $fault_list->where('fault_history_log.owner_id',$request->input('owner_id'));
            }
            if($request->has('oem_id') && $request->input('oem_id')){
                $fault_list = $fault_list->where('fault_history_log.oem_id',$request->input('oem_id'));
            }
            if($request->has('bin') && $request->input('bin')){
                $fault_list = $fault_list->where('fault_history_log.bin', 'like', '%'.$request->input('bin').'%');
            }
            if($request->has('charger_id') && $request->input('charger_id')){
                $fault_list = $fault_list->where('fault_history_log.charger_id', 'like', '%'.$request->input('charger_id').'%');
            }
            if($request->has('connector_id') && $request->input('connector_id')){
                $fault_list = $fault_list->where('fault_history_log.connector_id', 'like', '%'.$request->input('connector_id').'%');
            }
            if ($request->input('from_date') && $request->input('to_date')) {
                $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                $fault_list = $fault_list->whereBetween('fault_history_log.created_at', array($from_date, $to_date));
            }
            $fault_list = $fault_list->orderBy('fault_history_log.created_at','DESC')->paginate(10);
            if(count($fault_list) > 0){
                return $this->sendResponse('Fault report fetch successfully.',$fault_list);
            }else{
                return $this->sendError("Data not found");
            } 
         }
        else{
              
            $fault_list = DB::table('fault_history_log')->where(['fault_history_log.is_active'=>1,'user_hub_log.user_id'=>$user->id])
            ->select('hub_master.name as station_name','fault_history_log.id','fault_history_log.bin','fault_history_log.charger_id','fault_history_log.connector_id','fault_history_log.alarms')
            ->addSelect(DB::raw('DATE_FORMAT(fault_history_log.created_at, "%d/%m/%Y") as occur_date'),DB::raw('DATE_FORMAT(fault_history_log.created_at, "%h:%i %p") as occur_time'))
            ->Join('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
            ->join('hub_master', 'fault_history_log.hub_id', '=', 'hub_master.hub_master_id');
                        if($request->has('country_id') && $request->input('country_id')){
                        $fault_list = $fault_list->where('hub_master.country_id',$request->input('country_id'));
                        }
                        if($request->has('state_id') && $request->input('state_id')){
                        $fault_list = $fault_list->where('hub_master.state_id',$request->input('state_id'));
                        }
                        if($request->has('city_id') && $request->input('city_id')){
                        $fault_list = $fault_list->where('hub_master.city_id',$request->input('city_id'));
                        }
                        if($request->has('hub_id') && $request->input('hub_id')){
                        $fault_list = $fault_list->where('fault_history_log.hub_id',$request->input('hub_id'));
                        }
                        if($request->has('owner_id') && $request->input('owner_id')){
                        $fault_list = $fault_list->where('fault_history_log.owner_id',$request->input('owner_id'));
                        }
                        if($request->has('oem_id') && $request->input('oem_id')){
                        $fault_list = $fault_list->where('fault_history_log.oem_id',$request->input('oem_id'));
                        }
                        if($request->has('bin') && $request->input('bin')){
                        $fault_list = $fault_list->where('fault_history_log.bin', 'like', '%'.$request->input('bin').'%');
                        }
                        if($request->has('charger_id') && $request->input('charger_id')){
                        $fault_list = $fault_list->where('fault_history_log.charger_id', 'like', '%'.$request->input('charger_id').'%');
                        }
                        if($request->has('connector_id') && $request->input('connector_id')){
                        $fault_list = $fault_list->where('fault_history_log.connector_id', 'like', '%'.$request->input('connector_id').'%');
                        }
                        if ($request->input('from_date') && $request->input('to_date')) {
                        $from_date = Carbon::parse($request->input('from_date'))->format('Y-m-d H:i:s');
                        $to_date = Carbon::parse($request->input('to_date'))->format('Y-m-d H:i:s');
                        $fault_list = $fault_list->whereBetween('fault_history_log.created_at', array($from_date, $to_date));
                        }
                        $fault_list = $fault_list->orderBy('fault_history_log.created_at','DESC')->paginate(10);
                        if(count($fault_list) > 0){
                        return $this->sendResponse('Fault report fetch successfully.',$fault_list);
                        }
                        else
                        {
                        return $this->sendError("Data not found");
                } 

            } 

        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function battery_history_report(Request $request) {
        try{
            $filename='battery_history.xlsx';
            Excel::store(new BatteryLogExport, $filename, 'battery_history_excel');
            // return Excel::download(new BatteryLogExport, $filename);
            return $this->sendResponse('Fault report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function export_swapping_report(Request $request) {
        try{
            $filename='swapping_report.xlsx';
            Excel::store(new SwappingTransactionExport, $filename, 'battery_history_excel');
            return $this->sendResponse('report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function export_bss_network_report(Request $request) {
        
        try{
            $filename='bss_network_report.xlsx';
            Excel::store(new BssNetworkExport, $filename, 'battery_history_excel');
            return $this->sendResponse('report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function export_fault_log_report(Request $request) {
        try{
            $filename='fault_log_report.xlsx';
            Excel::store(new FaultLogReportExport, $filename, 'battery_history_excel');
            return $this->sendResponse('report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function export_swap_report(Request $request) {
        try{
            $filename='swap_report.xlsx';
            Excel::store(new SwapReportExport, $filename, 'battery_history_excel');
            return $this->sendResponse('report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function export_weekly_billing_report(Request $request) {
        try{
            $filename='weekly_billing_report.xlsx';
            Excel::store(new WeeklyBillingReportExport, $filename, 'battery_history_excel');
            return $this->sendResponse('report fetch successfully.',['file'=>url('battery_history/'.$filename)]);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
}

