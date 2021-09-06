<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\QueueMaster;
use App\Models\HubMaster;
use App\Models\EvMaster;
use App\Models\EvInventoryMaster;
use App\Models\ChargerInventoryMaster;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class StationController extends BaseController {

    public function getStations(Request $request) {
        try {
            $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
                $data = DB::table('hub_master')->where(['is_active' => 1])->orderBy('name')->select('hub_master_id','name')->get();
            }else{
                $data = DB::table('user_hub_log')->where(['hub_master.is_active' => 1,'user_hub_log.user_id'=>$user->id])
                                ->join('hub_master', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                                ->orderBy('hub_master.name')->select('hub_master.hub_master_id','hub_master.name')->get();
            }     
            if(count($data)>0){
                return $this->sendResponse('Data fetch successfully!',$data);
            }else{
                return $this->sendError("Station not found.");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getStationsBycity(Request $request) {
      
        try {
          
            $user = Auth::user();
            if($user->hasRole(['Admin', 'Super Admin'])){
                if($request->has('city_id') && $request->input('city_id')){
                    $data = DB::table('hub_master')->where(['is_active' => 1,'hub_master.city_id'=> $request->city_id])->orderBy('name')->select('hub_master_id','name')->get();
                }
                else{
                    $data = DB::table('hub_master')->where(['is_active' => 1])->orderBy('name')->select('hub_master_id','name')->get();
                }
            }
            else{
                if(!empty($request->city_id)){
                    $data = DB::table('hub_master')->where(['hub_master.is_active' => 1,'hub_master.city_id'=> $request->city_id, 'user_hub_log.user_id'=>$user->id])->orderBy('hub_master.name')
                                    ->leftJoin('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                                    ->select('hub_master.hub_master_id','hub_master.name')->get();
                }
                else{
                    $data = DB::table('hub_master')->where(['hub_master.is_active' => 1, 'user_hub_log.user_id'=>$user->id])->orderBy('hub_master.name')
                                    ->leftjoin('user_hub_log', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                                    ->select('hub_master.hub_master_id','hub_master.name')->get();
                } 
            }
                      
            if(count($data)>0){
                return $this->sendResponse('Data fetch successfully!',$data);
            }else{
                return $this->sendError("Station not found.");
            }            
        }catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
       
       
       
       
            
       //$data = DB::table('hub_master')->where(['is_active' => 1])->select('hub_master_id','name');   
            if($request->has('country_id') && $request->input('country_id')){
                $data = $data->where('country_id',$request->input('country_id'));
            }
            if($request->has('state_id') && $request->input('state_id')){
                $data = $data->where('state_id',$request->input('state_id'));
            }
            if($request->has('city_id') && $request->input('city_id')){
                $data = $data->where('city_id',$request->input('city_id'));
            }
            $data = $data->orderBy('name')->get();
            if(count($data)>0){
                return $this->sendResponse('Data fetch successfully!',$data);
            }else{
                return $this->sendError("Station not found.");
            }            
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function add(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'name' => 'required',
                        'address' => 'required',
                        'city_id' => 'required|integer',
                        'state_id' => 'required|integer',
                        'country_id' => 'required|integer', 
                        'ev_capacity' => 'required|integer',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $post_data['created_by'] = Auth::user()->id;
            HubMaster::create($post_data);
            return $this->sendResponse('Station added successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getStationById(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                'hub_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            $station = HubMaster::find($post_data['hub_master_id']);
            return $this->sendResponse('Station fetch successfully.',$station);
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }
    
    public function update(Request $request) {
        try{
            $post_data = (count($request->all()) == 0) ? $request->json()->all() : $request->all();
            $validator = Validator::make($post_data, [
                        'hub_master_id' => 'required',        
                        'name' => 'required',
                        'address' => 'required',
                        'city_id' => 'required|integer',
                        'state_id' => 'required|integer',
                        'country_id' => 'required|integer', 
                        'ev_capacity' => 'required|integer',
            ]);

            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }

            $id = $post_data['hub_master_id'];                                    
            $user = HubMaster::find($id);
            $user->update($post_data);
            return $this->sendResponse('Station updated successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function list(Request $request) {
        try{
            $hub_list = HubMaster::where(['hub_master.is_active'=>1])->select('hub_master.*','country_name','state_name','city_name')
                            ->leftjoin('country_master', 'country_master.id', '=', 'hub_master.country_id')
                            ->leftjoin('state_master', 'state_master.id', '=', 'hub_master.state_id')
                            ->leftjoin('city_master', 'city_master.id', '=', 'hub_master.city_id');
            if($request->has('search_param') && $request->input('search_param')){
                $hub_list = $hub_list->where(function($query) use ($request){
                                $columns = ['hub_master.name','address','ev_capacity','total_charger','latitude','longitude','remark_1','remark_2','country_name','state_name','city_name'];
                                foreach($columns as $column){
                                    $query->orWhere($column, 'LIKE', '%' . $request->input('search_param') . '%');
                                }
                            });
            }
            $hub_list = $hub_list->orderBy('hub_master_id','DESC')->paginate(10);
            if(count($hub_list) > 0){
                foreach($hub_list as $row){
                    $row->total_charger = ChargerInventoryMaster::where(['hub_id' => $row->hub_master_id,'is_active'=>1])->count();
                }
                return $this->sendResponse('Station list fetch successfully.',$hub_list);
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
                'hub_master_id' => 'required|integer'
            ]);
            if ($validator->fails()) {
                $msg = implode(", ", $validator->errors()->all());
                return $this->sendError($msg);
            }
            
            HubMaster::find($post_data['hub_master_id'])->update(['is_active'=>0]);
            return $this->sendResponse('Station deleted successfully.');
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

    public function getDashboardData(Request $request) {
        try {
            $temp_date = [];
            for($i=6;$i>=0;$i--){
                $temp_date[] = Carbon::now()->subDays($i)->format('d-M');
            }
            $user = Auth::user();
            $user_hub = [];
            $is_all_hub  = 0;
            if($user->hasRole('Operator')){
                $hub_data = DB::table('user_hub_log')->where(['user_id'=>$user->id,'role_id'=>1,'is_active'=>1])->select('hub_id')->first();
                if($hub_data && $hub_data->hub_id >0){
                    $user_hub[] = $hub_data->hub_id;
                }               
            }else{
                if($request->input('station_id')){
                    $user_hub[] = $request->input('station_id');
                }else{
                    $is_all_hub  = 1;
                    if($user->hasRole(['Admin', 'Super Admin'])){
                        $user_hub = DB::table('hub_master')->where(['is_active' => 1])->pluck('hub_master_id');
                    }else{
                        $user_hub = DB::table('user_hub_log')->where(['hub_master.is_active' => 1,'user_hub_log.user_id'=>$user->id])
                                        ->join('hub_master', 'user_hub_log.hub_id', '=', 'hub_master.hub_master_id')
                                        ->pluck('hub_master.hub_master_id');                        
                    }
                }                
            } 
            if(count($user_hub) <= 0){
                return $this->sendError("Station not found.");
            }           
            /*------------------------------EV data------------------------------*/
            $total_ev = DB::table('ev_inventory_master')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['ev']['total'] = $total_ev;
                        
            /*------------------------------station data------------------------------*/
            $data['station']['total']= ($is_all_hub == 0)?1:DB::table('hub_master')->where(['is_active' => 1])->whereIn('hub_master_id', $user_hub)->count();
            $data['station']['faulty']= DB::table('hub_master')->where(['is_active' => 1,'is_faulty' => 1])->whereIn('hub_master_id', $user_hub)->count();
            $data['station']['operational']= DB::table('hub_master')->where(['is_active' => 1,'is_faulty' => 0])->whereIn('hub_master_id', $user_hub)->count();
            
            /*------------------------------swapping data------------------------------*/
            $swap_day = 0;
            $swapping_data = DB::table('transaction_log')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)
                                ->select(DB::raw('DATE(created_at) as date'), DB::raw('count(*) as total'),DB::raw("SUM(CASE 
                                WHEN status < 7 THEN 1 ELSE 0 END) AS incomplete"),DB::raw("SUM(CASE 
                                WHEN status = 7 THEN 1 ELSE 0 END) AS complete"))
                                ->groupBy(DB::raw('Date(created_at)'))->orderBy('date','DESC')
                                ->limit(7)->get()->toArray();
            $cumulative = DB::table('transaction_log')->where(['is_active' => 1,'status' => 7])->whereIn('hub_id', $user_hub)->count();
            $swap_day = count(DB::table('transaction_log')->where(['is_active' => 1,'status' => 7])->whereIn('hub_id', $user_hub)->groupBy(DB::raw('Date(created_at)'))->select(DB::raw('Date(created_at)'))->get());   
            
            if(count($swapping_data)>0){
                $swap_date = array_column($swapping_data, 'date');
                $swapping_date2 = [];         
                foreach($swap_date as $s_date){
                    $swapping_date2[] = Carbon::parse($s_date)->format('d-M');
                }

                $complete_swap = array_column($swapping_data, 'complete');
                $incomplete_swap = array_column($swapping_data, 'incomplete');
                $data['swapping']['total_last_7']=array_sum($complete_swap);
                $data['swapping']['date']= array_reverse($swapping_date2);
                $data['swapping']['complete_swap_data']=array_reverse($complete_swap);
                $data['swapping']['incomplete_swap_data']=array_reverse($incomplete_swap);
                $data['swapping']['cumulative']=$cumulative;
                $data['swapping']['daily']=round($cumulative/$swap_day);
            }else{
                $data['swapping']['total_last_7']=0;
                $data['swapping']['date']= $temp_date;
                $data['swapping']['complete_swap_data']=[0,0,0,0,0,0,0];
                $data['swapping']['incomplete_swap_data']=[0,0,0,0,0,0,0];
                $data['swapping']['cumulative']=0;
                $data['swapping']['daily']=0;
            }
            
            /*------------------------------energy data------------------------------*/
            $enery_sold = DB::table('transaction_log')
                    ->select(DB::raw('DATE(created_at) as date'),DB::raw('ROUND(SUM(((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2)))/1000,2) as energy'))
                    ->groupBy(DB::raw('Date(created_at)'))->orderBy('date','DESC')->limit(7)
                    ->where(['status' => 7,'is_active'=>1])->whereIn('hub_id', $user_hub)
                    ->get()->toArray();

            $cumulative_enery_sold = DB::table('transaction_log')->where(['status' => 7,'is_active'=>1])->whereIn('hub_id', $user_hub)
                    ->sum(DB::raw('((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2))'));
            $cumulative_enery_sold = $cumulative_enery_sold/1000;
            if(count($enery_sold)>0){
                $energy_date = array_reverse(array_column($enery_sold, 'date'));
                $energy_date2 = [];         
                foreach($energy_date as $s_date){
                    $energy_date2[] = Carbon::parse($s_date)->format('d-M');
                }
                $energy_data = array_column($enery_sold, 'energy');
                $data['energy_sold']['total_last_7']= round(array_sum($energy_data),2);
                $data['energy_sold']['date']=$energy_date2;
                $data['energy_sold']['data']=array_reverse($energy_data);
                $data['energy_sold']['cumulative']=round($cumulative_enery_sold,2);
                // $data['energy_sold']['month_till_date']=500; 
                $avg_unit_per_ev = ($total_ev>0)?($cumulative_enery_sold/$total_ev):0;
                $data['energy_sold']['avg_unit_per_ev_per_day']=($swap_day > 0)?round(($avg_unit_per_ev/$swap_day),2):0;
            }else{
                $data['energy_sold']['total_last_7']= 0;
                $data['energy_sold']['date']=$temp_date;
                $data['energy_sold']['data']=[0,0,0,0,0,0,0];
                $data['energy_sold']['cumulative']=0;
                // $data['energy_sold']['month_till_date']=0; 
                $data['energy_sold']['avg_unit_per_ev_per_day']=0;
            }
            /*------------------------------batteries data------------------------------*/
            $data['batteries']['total'] = DB::table('battery_inventory')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['batteries']['charged']= DB::table('battery_inventory')->where(['is_active' => 1,'in_charging' => 0])->whereIn('hub_id', $user_hub)->where('soc','>',50)->count();
            $data['batteries']['discharged']= DB::table('battery_inventory')->where(['is_active' => 1,'in_charging' => 0])->whereIn('hub_id', $user_hub)->where('soc','<=',50)->count();
            $data['batteries']['in_charging']= DB::table('battery_inventory')->where(['is_active' => 1,'in_charging' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['batteries']['faulty']=DB::table('battery_inventory')->where(['is_active' => 1,'is_faulty' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['batteries']['out'] = DB::table('battery_inventory')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)->where('ev_inventory_id','>',0)->count();

            /*------------------------------chargers data------------------------------*/
            $data['chargers']['total'] = DB::table('charger_inventory')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['chargers']['operational']= DB::table('charger_inventory')->where(['is_active' => 1,'is_faulty' => 0])->whereIn('hub_id', $user_hub)->count();
            $data['chargers']['faulty']= DB::table('charger_inventory')->where(['is_active' => 1,'is_faulty' => 1])->whereIn('hub_id', $user_hub)->count();

            /*------------------------------slots data------------------------------*/
            $data['slots']['total'] =  DB::table('charger_slot')->where(['is_active' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['slots']['inuse'] = DB::table('charger_slot')->where(['is_active' => 1,'in_use' => 1])->whereIn('hub_id', $user_hub)->count();
            $data['slots']['available'] = DB::table('charger_slot')->where(['is_active' => 1,'in_use' => 0,'is_faulty' => 0])->whereIn('hub_id', $user_hub)->count();
            $data['slots']['faulty'] = DB::table('charger_slot')->where(['is_active' => 1,'is_faulty' => 1])->whereIn('hub_id', $user_hub)->count();

            /*------------------------------MISC data------------------------------*/
            $unit_30 = DB::table('transaction_log')->where(['is_active'=>1,'status' => 7])->whereIn('hub_id', $user_hub)
                            ->whereDate('created_at', '>=' ,Carbon::now()->subDays(30))
                            ->sum(DB::raw('((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2))'));
            $data['misc']['unit_30'] = round($unit_30/1000,2);
            $data['misc']['swap_30']=DB::table('transaction_log')->whereDate('created_at', '>=' ,Carbon::now()->subDays(30))->where(['is_active' => 1,'status' => 7])->whereIn('hub_id', $user_hub)->count();
            return $this->sendResponse('Data fetch successfully!',$data);          
        } catch (Throwable $e) {
            return $this->sendError("Something went wrong.");
        }
    }

}

