<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChargerInventoryMaster extends Model {

    protected $table = 'charger_inventory';
    protected $fillable = ['charger_master_id','hub_id','charger_id','qr_code','no_of_slot','own_by','remark_1','remark_2', 'is_faulty', 'is_active','all_data', 'created_by'];
    protected $primaryKey = 'id';

}
