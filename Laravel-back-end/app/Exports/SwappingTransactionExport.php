<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SwappingTransactionExport implements FromCollection,WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        $transaction_list = DB::table('transaction_log')->where(['transaction_log.is_active'=>1])
                            ->where('transaction_log.status',7)
                            ->select('hub_master.name as station_name','users.name as operator','fleet_operator_master.name as fleet_operator_name','transaction_log.e_qr_code','start_time')
                            ->addSelect('discharged_battery_bin_1','discharged_battery_soc_1','discharged_battery_bv_1','discharged_battery_rec_1',DB::raw('(discharged_battery_bv_1*discharged_battery_rec_1) AS kwh1'))
                            ->addSelect('discharged_battery_bin_2','discharged_battery_soc_2','discharged_battery_bv_2','discharged_battery_rec_2',DB::raw('(discharged_battery_bv_2*discharged_battery_rec_2) AS kwh2'))
                            ->addSelect('end_time','charged_battery_bin_1','charged_battery_soc_1','charged_battery_bv_1','charged_battery_rec_1',DB::raw('(charged_battery_bv_1*charged_battery_rec_1) AS kwh3'))
                            ->addSelect('charged_battery_bin_2','charged_battery_soc_2','charged_battery_bv_2','charged_battery_rec_2',DB::raw('(charged_battery_bv_2*charged_battery_rec_2) AS kwh4'))
                            ->addSelect(DB::raw('(((charged_battery_bv_1*charged_battery_rec_1)-(discharged_battery_bv_1*discharged_battery_rec_1)) + ((charged_battery_bv_2*charged_battery_rec_2)-(discharged_battery_bv_2*discharged_battery_rec_2))) AS energy'))
                            ->join('hub_master', 'transaction_log.hub_id', '=', 'hub_master.hub_master_id')
                            ->join('users', 'transaction_log.created_by', '=', 'users.id')
                            ->leftJoin('ev_inventory_master', 'transaction_log.ev_inventory_id', '=', 'ev_inventory_master.ev_inventory_id')
                            ->leftJoin('fleet_operator_master', 'fleet_operator_master.fleet_operator_id', '=', 'ev_inventory_master.fleet_owner_id');
            if(request()->has('country_id') && request()->input('country_id')){
                $transaction_list = $transaction_list->where('hub_master.country_id',request()->input('country_id'));
            }
            if(request()->has('state_id') && request()->input('state_id')){
                $transaction_list = $transaction_list->where('hub_master.state_id',request()->input('state_id'));
            }
            if(request()->has('city_id') && request()->input('city_id')){
                $transaction_list = $transaction_list->where('hub_master.city_id',request()->input('city_id'));
            }
            if(request()->has('hub_id') && request()->input('hub_id')){
                $transaction_list = $transaction_list->where('transaction_log.hub_id',request()->input('hub_id'));
            }
            if(request()->has('operator_id') && request()->input('operator_id') && trim(request()->input('operator_id'))!="All Fleet Operator" ){
                $transaction_list = $transaction_list->where('ev_inventory_master.fleet_owner_id',request()->input('operator_id'));
            }
            if(request()->has('ev_qr_code') && request()->input('ev_qr_code')){
                $transaction_list = $transaction_list->where('transaction_log.e_qr_code', 'like', '%'.request()->input('ev_qr_code').'%');
            }
            if (request()->input('from_date') && request()->input('to_date')) {
                $from_date = Carbon::parse(request()->input('from_date'))->format('Y-m-d H:i:s');
                $to_date = Carbon::parse(request()->input('to_date'))->format('Y-m-d H:i:s');
                $transaction_list = $transaction_list->whereBetween('transaction_log.updated_at', array($from_date, $to_date));
            }
            $transaction_list = $transaction_list->orderBy('transaction_log_id','DESC')->get();
            return $transaction_list;
    }
    public function headings(): array
    {
        return [
            'Station',
            'Operator',
            'Fleet Operator',
            'EV QR Code',
            'In Time',
            'Battery In - 1',
            'SOC',
            'BV',
            'Ahr',
            'Kwh',
            'Battery In - 2',
            'SOC',
            'BV',
            'Ahr',
            'Kwh',
            'Out Time',
            'Battery Out - 1',
            'SOC',
            'BV',
            'Ahr',
            'Kwh',
            'Battery Out - 2',
            'SOC',
            'BV',
            'Ahr',
            'Kwh',
            'Energy Sold'
        ];
    }
}
