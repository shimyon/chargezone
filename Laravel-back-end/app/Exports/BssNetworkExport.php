<?php

namespace App\Exports;

use App\Models\HubMaster;
use App\Models\EvInventoryMaster;
use App\Models\ChargerInventoryMaster;
use App\Models\BatteryInventoryMaster;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BssNetworkExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $hub_list = HubMaster::where(['hub_master.is_active'=>1])->select('hub_master.hub_master_id','country_name','state_name','city_name','hub_master.name as hub_name')
                            ->leftjoin('country_master', 'country_master.id', '=', 'hub_master.country_id')
                            ->leftjoin('state_master', 'state_master.id', '=', 'hub_master.state_id')
                            ->leftjoin('city_master', 'city_master.id', '=', 'hub_master.city_id');
            if(request()->has('country_id') && request()->input('country_id')){
                $hub_list = $hub_list->where('hub_master.country_id',request()->input('country_id'));
            }
            if(request()->has('state_id') && request()->input('state_id')){
                $hub_list = $hub_list->where('hub_master.state_id',request()->input('state_id'));
            }
            if(request()->has('city_id') && request()->input('city_id')){
                $hub_list = $hub_list->where('hub_master.city_id',request()->input('city_id'));
            }
            if(request()->has('hub_id') && request()->input('hub_id')){
                $hub_list = $hub_list->where('hub_master.hub_master_id',request()->input('hub_id'));
            }
            $hub_list = $hub_list->orderBy('hub_master.name')->get();

            foreach($hub_list as $row){
                $total_ev  = EvInventoryMaster::where(['ev_inventory_master.is_active'=>1,'ev_inventory_master.hub_id' => $row->hub_master_id])
                            ->join('ev_master', 'ev_inventory_master.ev_master_id', '=', 'ev_master.ev_master_id')->count();
                $row->total_ev = ($total_ev!="")?$total_ev:0;
                $row->total_charger = ChargerInventoryMaster::where(['charger_inventory.is_active'=>1,'charger_inventory.hub_id' => $row->hub_master_id])
                            ->join('charger_master', 'charger_inventory.charger_master_id', '=', 'charger_master.id')->count();

                $row->total_connector =  DB::table('charger_slot')->where(['is_active'=>1,'hub_id' => $row->hub_master_id])->count();
                
                $row->total_batteries =  BatteryInventoryMaster::where(['battery_inventory.is_active'=>1,'battery_inventory.hub_id' => $row->hub_master_id])
                            ->join('battery_master', 'battery_inventory.battery_master_id', '=', 'battery_master.battery_master_id')->count();                
                // unset($row->hub_master_id);
            }
            return $hub_list;
    }
    
    public function headings(): array
    {
        return [
            'Hub Id',
            'Country',
            'State',
            'City',
            'Station',
            'Total EV',
            'Total Charger',
            'Total Connector',
            'Total Batteries'
        ];
    }
}
