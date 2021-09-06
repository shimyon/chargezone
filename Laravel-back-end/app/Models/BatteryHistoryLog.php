<?php

namespace App\Models;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class BatteryHistoryLog extends Eloquent {

    protected $connection = 'mongodb';
    protected $collection = 'battery_it_log';
    protected $hidden = ['_id'];
    protected $fillable = [
        'bin', 'battery_voltage', 'rec', 'battery_current', 'soc', 'lat', 'lon','all_data','created_at','create_timestamp'
    ];
}
