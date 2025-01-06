<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffLeave extends Model
{
    protected $table = 'staff_leave';
    protected $primaryKey = 'leave_id';
    public $timestamps = false;

    protected $fillable = [
        'staff_id',
        'reason',
        'leave_from',
        'leave_to'
    ];
}