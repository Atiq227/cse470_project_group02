<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $table = 'item';
    protected $primaryKey = 'item_id';
    public $timestamps = false;
    
    protected $fillable = [
        'item_name',
        'item_price',
        'photo'
    ];
}