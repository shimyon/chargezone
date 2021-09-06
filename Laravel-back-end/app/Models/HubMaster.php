<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HubMaster extends Model {

    protected $table = 'hub_master';
    protected $fillable = ['hub_master_id', 'name', 'address', 'city_id', 'state_id', 'country_id','ev_capacity','total_charger','latitude','longitude','remark_1','remark_2', 'is_active', 'created_by','created_at','updated_at'];
    protected $primaryKey = 'hub_master_id';

}
