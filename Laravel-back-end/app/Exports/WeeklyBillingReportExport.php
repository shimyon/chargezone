<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;


class WeeklyBillingReportExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $from_date = Carbon::parse(request()->input('from_date'))->format('Y-m-d');
        $start_time = Carbon::parse(request()->input('from_date'))->format('H:i:s');
        $to_date = Carbon::parse(request()->input('from_date'))->addDay(6)->format('Y-m-d');
        $end_time = Carbon::parse(request()->input('to_date'))->format('H:i:s');
        
        $dateRange = \Carbon\CarbonPeriod::create($from_date, $to_date);

        $dates = [];
        foreach($dateRange as $date) {
            $dates[] = $date->format('Y-m-d');
        }
        $ev_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1,'transaction_log.status'=>7])
                        ->select('hub_master.name as station_name','transaction_log.e_qr_code')
                        ->whereBetween('transaction_log.created_at', array($from_date.' '.$start_time, $to_date.' '.$end_time))
                        ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id');
        if(request()->has('hub_id') && request()->input('hub_id')){
            $ev_list = $ev_list->where('transaction_log.hub_id',request()->input('hub_id'));
        }
        $ev_list = $ev_list->groupBy('transaction_log.e_qr_code')->orderBy('transaction_log.e_qr_code')->get();
        if(count($ev_list) > 0 && count($dates) > 0){
            foreach($ev_list as $ev_code){
                $day = 1;
                $energy_sum = 0;
                foreach($dates as $swap_date){
                    $e_date = Carbon::parse($swap_date)->addDay()->format('Y-m-d')." ".$end_time;
                    $energy = round(DB::table('transaction_log')->where(['status' => 7,'e_qr_code' => $ev_code->e_qr_code])
                                ->whereBetween('created_at', array($swap_date." ".$start_time, $e_date))
                                ->sum(DB::raw('((charged_battery_bv_1 * charged_battery_rec_1)-(discharged_battery_bv_1 * discharged_battery_rec_1))+((charged_battery_bv_2 * charged_battery_rec_2)-(discharged_battery_bv_2 * discharged_battery_rec_2))')),2);
                    $keyname = 'day_'.$day;
                    $ev_code->$day = $energy;
                    $day++;
                    $energy_sum += $energy;
                }    
                $ev_code->total_energy_supp = round($energy_sum,2);
                $ev_code->total_bill_amount = round($energy_sum*25.47,2);   
            }
        } 
        return $ev_list;
    }

    public function headings(): array
    {
        $from_date = Carbon::parse(request()->input('from_date'))->format('Y-m-d');
        $start_time = Carbon::parse(request()->input('from_date'))->format('H:i:s');
        $to_date = Carbon::parse(request()->input('from_date'))->addDay(6)->format('Y-m-d');
        $end_time = Carbon::parse(request()->input('to_date'))->format('H:i:s');
        
        $dateRange = \Carbon\CarbonPeriod::create($from_date, $to_date);

        $header_data = ['Station', 'Ev QR Code'];
        foreach($dateRange as $date) {
            $header_data[] = $date->format('d/m/Y');
        }
        $header_data[] = 'Total Energy Supplied';
        $header_data[] = 'Total Bill Amount';
        return $header_data;
    }
}
