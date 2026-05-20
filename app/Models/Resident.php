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
        'gender',
        'address',
        'contact_number',
        'height',
        'weight'

    ];

    public function checkups()
    {
        return $this->hasMany(Checkup::class);
    }
}
