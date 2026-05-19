<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
{
    Schema::create('immunizations', function (Blueprint $table) {

        $table->id();

        $table->string('child_name');

        $table->string('vaccine_name');

        $table->date('date_given');

        $table->date('next_schedule')->nullable();

        $table->string('status')->default('Pending');

        $table->timestamps();

    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('immunizations');
    }
};
