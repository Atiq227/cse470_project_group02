<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $table = 'customer'; // Ensure this matches your table name
    protected $primaryKey = 'customer_id'; // Ensure this matches your primary key

    protected $fillable = [
        'customer_name',
        'contact_number',
        'email',
        'password',
        'credit'
    ];

    protected $hidden = [
        'password'
    ];
}