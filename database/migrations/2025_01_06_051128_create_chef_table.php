<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('chef', function (Blueprint $table) {
            $table->increments('chef_id');
            $table->integer('chef_user_id')->unsigned();
            $table->text('chef_name');
            $table->integer('chef_contact');

            $table->foreign('chef_user_id')
                  ->references('user_id')
                  ->on('user')
                  ->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('chef');
    }
}; 