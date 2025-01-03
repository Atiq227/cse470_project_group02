<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('food_items', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Food item name
            $table->decimal('price', 8, 2); // Price with precision 8 and scale 2
            $table->integer('quantity')->default(0); // Quantity, default 0
            $table->boolean('is_available')->default(true); // Availability status, default true
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('food_items');
    }
};

