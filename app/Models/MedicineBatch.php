<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MedicineBatch extends Model
{
    protected $fillable = [
        'medicine_id',
        'batch_number',
        'date_received',
        'expiration_date',
        'quantity_received',
        'quantity_remaining',
    ];
}