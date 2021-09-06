<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CityMaster extends Model {

    protected $table = 'city_master';
    protected $fillable = ['state_id','city_name', 'is_active', 'created_by'];
    protected $primaryKey = 'id';

}
