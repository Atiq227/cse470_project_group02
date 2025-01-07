<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffComplaint extends Model
{
    protected $table = 'staff_complaints';
    protected $primaryKey = 'complaint_id';
    public $timestamps = false;

    protected $fillable = [
        'staff_id',
        'complaint_message'
    ];
}