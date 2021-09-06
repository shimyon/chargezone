<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StateMaster extends Model {

    protected $table = 'state_master';
    protected $fillable = ['country_id','state_name', 'is_active', 'created_by'];
    protected $primaryKey = 'id';

}
