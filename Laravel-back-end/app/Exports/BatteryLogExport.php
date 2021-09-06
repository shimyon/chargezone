<?php

namespace App\Exports;

use App\Models\BatteryHistoryLog;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BatteryLogExport implements  FromCollection, WithHeadings
{
    public function collection()
    {
        $from_date = (request()->input('from_date'))?Carbon::parse(request()->input('from_date'))->timestamp:Carbon::now()->timestamp;
        $to_date = (request()->input('to_date'))?Carbon::parse(request()->input('to_date'))->timestamp:Carbon::now()->timestamp;

        $data = BatteryHistoryLog::select('bin', 'battery_voltage', 'rec', 'battery_current', 'soc', 'lat', 'lon','all_data','created_at')->where('create_timestamp','!=',NULL)
                    ->where('create_timestamp','>=',intval($from_date))
                    ->where('create_timestamp','<=',intval($to_date));
        if(request()->input('bin')){
            $data = $data->where('bin', 'like', '%'.request()->input('bin').'%');
        }
        $data = $data->orderBy('_id','DESC')->get();
        // foreach($data as $row){
        //     $row->created_at1 = Carbon::parse($row->created_at)->format('d/m/Y h:i:s a');
        //     unset($row->created_at);
        // }
        return $data;
    }

    public function headings(): array
    {
        return [
            'BIN',
            'Battery Voltage',
            'REC',
            'Battery Current',
            'SOC',
            'Latitude',
            'Longitude',
            'All Data',
            'Created At',
        ];
    }
}
