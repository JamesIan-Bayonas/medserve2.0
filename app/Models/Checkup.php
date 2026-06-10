<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Checkup extends Model
{
    use HasFactory;

    protected $fillable = [
        'resident_id',
        'checkup_date',

        'blood_pressure',
        'temperature',
        'weight',
        'height',

        'reason_for_visit',
        'assessment',

        'medicine_given',
        'action_taken',

        'notes',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }
}