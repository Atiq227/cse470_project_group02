<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StaffTask extends Model
{
    protected $table = 'staff_tasks';
    protected $primaryKey = 'task_id';
    public $timestamps = false;

    protected $fillable = [
        'staff_id',
        'task_description',
        'status'
    ];
}