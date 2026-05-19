<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'name',
        'age',
        'gender',
        'address',
    ];

    public function checkups()
    {
        return $this->hasMany(Checkup::class);
    }
    //
}
