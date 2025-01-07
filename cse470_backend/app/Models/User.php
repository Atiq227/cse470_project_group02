<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'user'; // Specify the table name
    protected $primaryKey = 'user_id'; // Specify primary key
    public $timestamps = false; // If you don't have timestamp columns

    protected $fillable = [
        'email',
        'password'
    ];
}
