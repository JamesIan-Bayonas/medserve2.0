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
        Schema::table('residents', function (Blueprint $table) {
            // Idugang nato ang mga bag-ong columns ug himuong nullable
            $table->string('guardian_name')->nullable()->after('contact_number');
            $table->string('emergency_contact_name')->nullable()->after('guardian_name');
            $table->string('emergency_contact_relationship')->nullable()->after('emergency_contact_name');
            $table->string('emergency_contact_number')->nullable()->after('emergency_contact_relationship');
            $table->text('allergies')->nullable()->after('emergency_contact_number');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('residents', function (Blueprint $table) {
            // Tangtangon kung i-rollback
            $table->dropColumn([
                'guardian_name',
                'emergency_contact_name',
                'emergency_contact_relationship',
                'emergency_contact_number',
                'allergies'
            ]);
        });
    }
};