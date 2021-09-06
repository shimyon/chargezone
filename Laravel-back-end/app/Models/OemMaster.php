<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OemMaster extends Model {

    protected $table = 'oem_master';
    protected $fillable = ['type','name', 'address','contact_person','contact_email','contact_number','remark_1','remark_2','is_active','created_by'];
    protected $primaryKey = 'oem_id';

}
