<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerFavorite extends Model
{
    public $timestamps = false;
    protected $table = 'customer_favorites';
    protected $primaryKey = 'favorite_id';
    
    protected $fillable = [
        'customer_id',
        'item_id'
    ];

    public function item()
    {
        return $this->belongsTo(Item::class, 'item_id', 'item_id');
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class, 'customer_id', 'customer_id');
    }
}