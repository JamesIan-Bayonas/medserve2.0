<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Immunization extends Model
{
    use HasFactory;

    protected $fillable = [

        'child_name',
        'vaccine_name',
        'date_given',
        'next_schedule',
        'status'

    ];
}