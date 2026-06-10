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

            // Resident Reference
            $table->foreignId('resident_id')
                ->constrained()
                ->onDelete('cascade');

            // Checkup Information
            $table->date('checkup_date');

            // Vital Signs
            $table->string('blood_pressure')->nullable();
            $table->decimal('temperature', 5, 2)->nullable();
            $table->decimal('weight', 5, 2)->nullable();
            $table->decimal('height', 5, 2)->nullable();

            // Consultation Details
            $table->text('reason_for_visit')->nullable();
            $table->text('assessment')->nullable();

            // Treatment
            $table->text('medicine_given')->nullable();
            $table->text('action_taken')->nullable();

            // Additional Notes
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