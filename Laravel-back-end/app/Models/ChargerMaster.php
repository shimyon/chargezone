<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ChargerMaster extends Model {

    protected $table = 'charger_master';
    protected $fillable = ['oem_id','make','model','dimension','file_name_path','remark_1','remark_2','is_active','all_data', 'created_by'];
    protected $primaryKey = 'id';

}
