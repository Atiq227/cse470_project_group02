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
        Schema::create('orders', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('food_item_id') // Foreign key referencing the 'food_items' table
                  ->constrained('food_items') // Specify the referenced table
                  ->onDelete('cascade'); // Cascade delete when related food item is deleted
            $table->enum('status', ['accepted', 'declined', 'pending']) // Order status with limited values
                  ->default('pending'); // Default status is 'pending'
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
        Schema::dropIfExists('orders');
    }
};
