<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvMaster extends Model {

    protected $table = 'ev_master';
    protected $fillable = ['vehicle_model', 'battery_capacity', 'vehicle_make', 'vehicle_type','fleet_owner_id', 'fleet_owner', 'remark_1', 'remark_2', 'is_active', 'all_data', 'created_by'];
    protected $primaryKey = 'ev_master_id';

}
