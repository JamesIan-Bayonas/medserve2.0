<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    use HasFactory;

    protected $fillable = [
        'full_name',
        'age',
        'date_of_birth',
        'gender',
        'address',
        'contact_number',
        'guardian_name',
        'emergency_contact_name',
        'emergency_contact_relationship',
        'emergency_contact_number',
        'allergies',
    ];

    public function checkups()
    {
        return $this->hasMany(Checkup::class);
    }
}