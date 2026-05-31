<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicineDispensing;
use App\Models\Medicine;

class MedicineDispensingController extends Controller
{
    public function store(Request $request)
    {
        $medicine = Medicine::find($request->medicine_id);

        if (!$medicine) {
            return response()->json([
                'message' => 'Medicine not found'
            ], 404);
        }

        if ($request->quantity > $medicine->current_stock) {
            return response()->json([
                'message' => 'Not enough stock available.'
            ], 400);
        }

        MedicineDispensing::create([
            'resident_id' => $request->resident_id,
            'medicine_id' => $request->medicine_id,
            'quantity' => $request->quantity,
            'dosage' => $request->dosage,
            'instructions' => $request->instructions,
            'staff_id' => 1,
        ]);

        $medicine->current_stock -= $request->quantity;
        $medicine->save();

        return response()->json([
            'message' => 'Medicine dispensed successfully'
        ]);

        
    }
    public function history()
{
    $history = MedicineDispensing::with([
        'resident',
        'medicine'
    ])->latest()->get();

    return response()->json($history);
}
}