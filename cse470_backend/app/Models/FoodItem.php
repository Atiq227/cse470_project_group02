<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FoodItem extends Model
{
    protected $table = 'item';
    protected $primaryKey = 'item_id';
    
    protected $fillable = [
        'item_name',
        'item_price',
        'photo'
    ];

    protected $attributes = [
        'photo' => null
    ];

    public $timestamps = false;

    protected $casts = [
        'item_price' => 'decimal:2'
    ];
}
