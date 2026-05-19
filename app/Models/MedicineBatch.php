<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;

class MedicineBatch extends Model
{
    use HasFactory;

    // This explicitly tells Laravel which table to look for (optional but good practice)
    protected $table = 'medicine_batches';

    // These are the specific columns we are allowing the system to read and write to
    protected $fillable = [
        'medicine_id',
        'batch_number',
        'date_received',
        'expiration_date',
        'quantity_received',
        'quantity_remaining',
    ];


    // Ensuring dates are treated as Carbon instances makes our expiration logic much easier
    protected $casts = [
        'date_received' => 'date',
        'expiration_date' => 'date',
    ];

}