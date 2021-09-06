<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QueueMaster extends Model {

    protected $table = 'queue_master';
    protected $fillable = ['smarteSwappingId', 'hub_id', 'start_otp', 'end_otp', 'e_qr_code', 'ev_inventory_id', 'vechicle_id', 'discharged_battery_bin_1', 'discharged_battery_bin_2', 'charged_battery_bin_1', 'charged_battery_bin_2', 'vehicle_vin', 'registration_no', 'discharged_battery_soc_1', 'discharged_battery_soc_2', 'charged_battery_soc_1', 'charged_battery_soc_2', 'remark', 'start_time', 'end_time', 'is_active', 'created_by'];
    protected $primaryKey = 'queue_master_id';

}
