<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BatteryMaster extends Model {

    protected $table = 'battery_master';
    protected $fillable = ['oem_id', 'model_name','make_year','type_of_connector','file_name_path','remark_1','remark_2','all_data','is_active','created_by'];
    protected $primaryKey = 'battery_master_id';

}
