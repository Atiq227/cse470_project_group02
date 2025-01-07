<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        Schema::create('item', function (Blueprint $table) {
            $table->increments('item_id');
            $table->string('item_name', 100);
            $table->decimal('item_price', 10, 2);
            $table->longText('photo')->nullable()->default(DB::raw('NULL'));
        });
    }

    public function down()
    {
        Schema::dropIfExists('item');
    }
}; 