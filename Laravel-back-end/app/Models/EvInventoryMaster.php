<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EvInventoryMaster extends Model {

    protected $table = 'ev_inventory_master';
    protected $fillable = ['ev_master_id', 'e_qr_code', 'registration_no', 'hub_id', 'battery_id_1', 'battery_id_2', 'vechicle_id', 'vehicle_vin','fleet_owner_id', 'fleet_owner', 'remark_1', 'remark_2', 'modified', 'is_active', 'all_data', 'created_by'];
    protected $primaryKey = 'ev_inventory_id';

}
