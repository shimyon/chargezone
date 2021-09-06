<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OwnerMaster extends Model {

    protected $table = 'owner_master';
    protected $fillable = ['name', 'remark','all_data', 'is_active', 'created_by'];
    protected $primaryKey = 'owner_master_id';

}
