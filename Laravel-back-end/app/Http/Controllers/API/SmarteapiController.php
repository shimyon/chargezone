<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use App\Helpers\SmarteHelper;

class SmarteapiController extends BaseController {

    private function replace_null_with_empty_string($array) {
        foreach ($array as $key => $value) {
            if (is_array($value)) {
                $array[$key] = $this->replace_null_with_empty_string($value);
            } else {
                if (is_null($value) || $value=='') {
                    $array[$key] = 0;
                }
            }
        }
        return $array;
    }

    public function liveLocation() {
        $query_result['batteryLiveLocation'] = DB::table('battery_inventory')
                ->select('bin as batteryserialnumber', 'vehicle_vin as vin')
                ->addSelect(DB::raw('UNIX_TIMESTAMP(battery_inventory.updated_at) as last_seen'))
                ->addSelect('lat as latitude', 'lon as longitude', 'soc as stateofcharge')
                ->join('ev_inventory_master', 'battery_inventory.ev_inventory_id', 'ev_inventory_master.ev_inventory_id')
                ->where('ev_inventory_master.fleet_owner_id', 6)
                ->where('battery_inventory.is_active', 1)
                ->where('ev_inventory_master.is_active', 1)
                ->where('battery_inventory.ev_inventory_id', '>', 0)
                ->get();

        $crendentials = DB::table('smarte_credentials')->select('username', 'password', 'token')->where('log_id', 1)->first();
        $response = Http::withHeaders([
                    'authToken' => ($crendentials && $crendentials->token != "") ? $crendentials->token : 'L5H+WSnA/cefbN1qSK3hrEierWhUga6EqJAEBDKcJfosrI8mu4s0V19m1OAw34Dj1',
                    'Content-Type' => 'application/json'
                ])->post('http://juiceapi.getsmarte.in/erpApi/api/v1/vehicle/battery/livelocation', ($query_result));
        $response = json_decode($response);

        if ($response->responseCode == 401) {
            smarteHelper::getAuthToken();
        }
    }
    public function dailyPerformance() {
        $transaction_log = DB::table('transaction_log')->where(['is_active'=>1])
                    ->whereDate('created_at', Carbon::yesterday()->format('Y-m-d'))
                    ->get();
        $trans_data = [];
        foreach($transaction_log as $row){
            $arr['vin'] =  $row->vehicle_vin;
            $swap_arr= [];
            $swap_arr[0]['outgoingBin'] = $row->discharged_battery_bin_1;
            $swap_arr[0]['outgoingSoc'] = $row->discharged_battery_soc_1;
            $swap_arr[0]['outgoingVoltage'] = $row->discharged_battery_bv_1;
            $swap_arr[0]['outgoingAmpHr'] = 0;
            $swap_arr[0]['outgoingkWh'] = 0;
            $swap_arr[0]['kmRun'] = 0;
            $swap_arr[0]['incomingBin'] = $row->charged_battery_bin_1;
            $swap_arr[0]['incomingSoc'] = $row->charged_battery_soc_1;
            $swap_arr[0]['incomingVoltage'] = $row->charged_battery_bv_1;
            $swap_arr[0]['incomingAmpHr'] = 0;
            $swap_arr[0]['incomingkWh'] = 0;
            $swap_arr[0]['swappedOn'] = Carbon::parse($row->created_at)->valueOf();

            $swap_arr[1]['outgoingBin'] = $row->discharged_battery_bin_2;
            $swap_arr[1]['outgoingSoc'] = $row->discharged_battery_soc_2;
            $swap_arr[1]['outgoingVoltage'] = $row->discharged_battery_bv_2;
            $swap_arr[1]['outgoingAmpHr'] = 0;
            $swap_arr[1]['outgoingkWh'] = 0;
            $swap_arr[1]['kmRun'] = 0;
            $swap_arr[1]['incomingBin'] = $row->charged_battery_bin_2;
            $swap_arr[1]['incomingSoc'] = $row->charged_battery_soc_2;
            $swap_arr[1]['incomingVoltage'] = $row->charged_battery_bv_2;
            $swap_arr[1]['incomingAmpHr'] = 0;
            $swap_arr[1]['incomingkWh'] = 0;
            $swap_arr[1]['swappedOn'] = Carbon::parse($row->created_at)->valueOf();

            $arr['batterySwappingDetail'] =  $swap_arr;
            $trans_data[] = $arr;
        }
        $trans_data = $this->replace_null_with_empty_string(json_decode(json_encode($trans_data), TRUE));
        $query_result['batteryDailyPerformance'] = $trans_data;
        $crendentials = DB::table('smarte_credentials')->select('username', 'password', 'token')->where('log_id', 1)->first();
        $response = Http::withHeaders([
                    'authToken' => ($crendentials && $crendentials->token != "") ? $crendentials->token : 'L5H+WSnA/cefbN1qSK3hrEierWhUga6EqJAEBDKcJfosrI8mu4s0V19m1OAw34Dj1',
                    'Content-Type' => 'application/json'
                ])->post('http://juiceapi.getsmarte.in/erpApi/api/v1/vehicle/battery/dailyPerformance', ($query_result));
        $jsonData = $response->json();

        if ($response->status() == 401) {
            smarteHelper::getAuthToken();
        }
    }

}
