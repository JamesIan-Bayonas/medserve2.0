<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicine extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'name',
        'category',
        'unit',
        'current_stock',
        'minimum_stock',
        'purchase_price',
    ];

    protected $casts = [
        'purchase_price' => 'decimal:2',
        'current_stock'  => 'integer',
        'minimum_stock'  => 'integer',
    ];
}
