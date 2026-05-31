<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Resident;
use App\Models\Medicine;

class MedicineDispensing extends Model
{
    protected $table = 'medicine_dispensing';

    protected $fillable = [
        'resident_id',
        'medicine_id',
        'quantity',
        'dosage',
        'instructions',
        'staff_id',
    ];

    public function resident()
    {
        return $this->belongsTo(Resident::class);
    }

    public function medicine()
    {
        return $this->belongsTo(Medicine::class);
    }
}