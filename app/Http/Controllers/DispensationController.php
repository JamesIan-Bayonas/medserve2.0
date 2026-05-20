<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MedicineBatch;
use App\Models\Resident;

class DispensationController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'medicine_batch_id' => 'required|exists:medicine_batches,id',
            'quantity_dispensed' => 'required|integer|min:1'
        ]);

        $batch = MedicineBatch::findOrFail($request->medicine_batch_id);

        // Prevent dispensing more than what is available
        if ($batch->quantity_remaining < $request->quantity_dispensed) {
            return response()->json([
                'message' => 'Insufficient stock in this batch.',
                'available' => $batch->quantity_remaining
            ], 422);
        }

        // Deduct the stock
        $batch->quantity_remaining -= $request->quantity_dispensed;
        $batch->save();

        // Note: If you have a specific Dispensation model/table to log the history, 
        // you would create that record here (e.g., Dispensation::create([...]))

        return response()->json([
            'message' => 'Medicine dispensed successfully.',
            'batch' => $batch->fresh()
        ], 200);
    }
}