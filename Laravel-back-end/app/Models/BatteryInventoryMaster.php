<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatteryInventoryMaster extends Model {

    protected $table = 'battery_inventory';
    protected $fillable = ['battery_master_id', 'serial_number','hub_id','ev_inventory_id','b_qr_code','own_by','bin','imei','soc','bv','rec','lat','long','lon','remark','is_active','created_by'];
    protected $primaryKey = 'battery_inventory_id';

}
