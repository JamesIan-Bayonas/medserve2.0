<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkup extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        // TODO: Add other columns based on what you need to track for a checkup
        // 'blood_pressure',
        // 'temperature',
        // 'weight',
        // 'notes',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}