<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UserHubLog extends Model {

    protected $table = 'user_hub_log';
    protected $fillable = ['hub_id', 'user_id', 'role_id', 'is_active', 'created_by'];
    protected $primaryKey = 'log_id';

}
