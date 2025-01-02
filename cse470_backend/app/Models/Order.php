<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'order_table';
    protected $primaryKey = 'order_id';
    public $timestamps = false;
    
    protected $fillable = [
        'items',
        'staff_id',
        'chef_id',
        'amount',
        'payment_method',
        'status',
        'feedback_rating',
        'feedback_comment'
    ];

    protected $casts = [
        'items' => 'array'
    ];
}