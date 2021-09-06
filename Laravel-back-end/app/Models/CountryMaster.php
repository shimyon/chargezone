<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CountryMaster extends Model {

    protected $table = 'country_master';
    protected $fillable = ['country_name', 'is_active', 'created_by'];
    protected $primaryKey = 'id';

}
