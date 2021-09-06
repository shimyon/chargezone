<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FaultLogReportExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $fault_list = DB::table('fault_history_log')->where(['fault_history_log.is_active'=>1])
                        ->select('hub_master.name as station_name','fault_history_log.charger_id','fault_history_log.connector_id')
                        ->addSelect(DB::raw('DATE_FORMAT(fault_history_log.created_at, "%d/%m/%Y") as occur_date'),DB::raw('DATE_FORMAT(fault_history_log.created_at, "%h:%i %p") as occur_time'),'fault_history_log.alarms')
                        ->join('hub_master', 'fault_history_log.hub_id', '=', 'hub_master.hub_master_id');
        if(request()->has('country_id') && request()->input('country_id')){
            $fault_list = $fault_list->where('hub_master.country_id',request()->input('country_id'));
        }
        if(request()->has('state_id') && request()->input('state_id')){
            $fault_list = $fault_list->where('hub_master.state_id',request()->input('state_id'));
        }
        if(request()->has('city_id') && request()->input('city_id')){
            $fault_list = $fault_list->where('hub_master.city_id',request()->input('city_id'));
        }
        if(request()->has('hub_id') && request()->input('hub_id')){
            $fault_list = $fault_list->where('fault_history_log.hub_id',request()->input('hub_id'));
        }
        if(request()->has('owner_id') && request()->input('owner_id')){
            $fault_list = $fault_list->where('fault_history_log.owner_id',request()->input('owner_id'));
        }
        if(request()->has('oem_id') && request()->input('oem_id')){
            $fault_list = $fault_list->where('fault_history_log.oem_id',request()->input('oem_id'));
        }
        if(request()->has('bin') && request()->input('bin')){
            $fault_list = $fault_list->where('fault_history_log.bin', 'like', '%'.request()->input('bin').'%');
        }
        if(request()->has('charger_id') && request()->input('charger_id')){
            $fault_list = $fault_list->where('fault_history_log.charger_id', 'like', '%'.request()->input('charger_id').'%');
        }
        if(request()->has('connector_id') && request()->input('connector_id')){
            $fault_list = $fault_list->where('fault_history_log.connector_id', 'like', '%'.request()->input('connector_id').'%');
        }
        if (request()->input('from_date') && request()->input('to_date')) {
            $from_date = Carbon::parse(request()->input('from_date'))->format('Y-m-d H:i:s');
            $to_date = Carbon::parse(request()->input('to_date'))->format('Y-m-d H:i:s');
            $fault_list = $fault_list->whereBetween('fault_history_log.created_at', array($from_date, $to_date));
        }
        $fault_list = $fault_list->orderBy('fault_history_log.created_at','DESC')->get();
        return $fault_list;
    }

    public function headings(): array
    {
        return [
            'Station',
            'Charger Id',
            'Connector Id',
            'Date Of Occurence',
            'Time Of Occurence',
            'Alarm'
        ];
    }
}
