<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FleetOperatorMaster extends Model {

    protected $table = 'fleet_operator_master';
    protected $fillable = ['name','fleet_id', 'address','contact_person','contact_email','contact_number','hub_id','remark_1','remark_2','is_active','created_by'];
    protected $primaryKey = 'fleet_operator_id';

}
