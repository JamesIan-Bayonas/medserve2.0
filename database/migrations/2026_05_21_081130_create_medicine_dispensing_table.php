<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
       Schema::create('medicine_dispensing', function (Blueprint $table) {
    $table->id();

    $table->foreignId('resident_id')->constrained()->onDelete('cascade');

    $table->foreignId('medicine_id')->constrained()->onDelete('cascade');

    $table->integer('quantity');

    $table->string('dosage');

    $table->text('instructions')->nullable();

    $table->foreignId('staff_id')->constrained('users');

    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('medicine_dispensing');
    }
};
