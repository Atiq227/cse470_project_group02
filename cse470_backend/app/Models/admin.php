<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    protected $table = 'admin'; // Specify the table name

    protected $fillable = [
        'admin_email',
        'password'
    ];

    protected $hidden = [
        'password',
    ];
}