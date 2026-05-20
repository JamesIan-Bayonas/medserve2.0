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
        Schema::create('checkups', function (Blueprint $table) {
            $table->id();
            
            // Creates 'resident_id' and automatically links it to the 'id' on the 'residents' table
            $table->foreignId('resident_id')->constrained()->onDelete('cascade');
            
            // Health metrics (nullable in case some checkups don't record everything)
            $table->string('blood_pressure')->nullable();
            $table->decimal('temperature', 5, 2)->nullable(); // e.g. 36.50
            $table->decimal('weight', 5, 2)->nullable(); // e.g. 70.50
            $table->text('notes')->nullable();
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('checkups');
    }
};