<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('medicine_batches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('medicine_id')->constrained('medicines')->onDelete('cascade');
            $table->string('batch_number')->unique();
            $table->date('date_received');
            $table->date('expiration_date');
            $table->integer('quantity_received');
            $table->integer('quantity_remaining');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('medicine_batches');
    }
};