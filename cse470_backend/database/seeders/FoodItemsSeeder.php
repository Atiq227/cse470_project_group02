<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FoodItem;

class FoodItemsSeeder extends Seeder
{
    public function run()
    {
        FoodItem::create([
            'name' => 'Test Food Item',
            'price' => 9.99,
            'description' => 'This is a test food item',
            'image_url' => 'https://example.com/image.jpg'
        ]);
    }
} 