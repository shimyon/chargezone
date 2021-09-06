<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FaultMaster extends Model {

    protected $table = 'fault_master';
    protected $fillable = ['type', 'title','oem_id','bit_position','is_active','created_by'];
    protected $primaryKey = 'id';

}
