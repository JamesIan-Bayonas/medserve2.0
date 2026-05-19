<?php

namespace App\Http\Controllers;

use App\Models\MedicineBatch;
use Illuminate\Http\Request;

class MedicineBatchController extends Controller
{
    // FETCH ALL BATCHES
    public function index()
    {
        return MedicineBatch::all();
    }

    // STORE NEW BATCH
    public function store(Request $request)
    {
        // VALIDATION
        $request->validate([

            'medicine_id' =>
                'required',

            'batch_number' =>
                'required|unique:medicine_batches,batch_number',

            'date_received' =>
                'required|before_or_equal:today',

            'expiration_date' =>
                'required|after:today',

            'quantity_received' =>
                'required|numeric|min:1',

        ], [

            // CUSTOM ERROR MESSAGES

            'medicine_id.required' =>
                'Medicine ID is required.',

            'batch_number.required' =>
                'Batch number is required.',

            'batch_number.unique' =>
                'Failed to add. Batch number already exists.',

            'date_received.required' =>
                'Date received is required.',

            'date_received.before_or_equal' =>
                'Date received cannot be in the future.',

            'expiration_date.required' =>
                'Expiration date is required.',

            'expiration_date.after' =>
                'Failed to add. Medicine is already expired.',

            'quantity_received.required' =>
                'Quantity received is required.',

            'quantity_received.numeric' =>
                'Quantity must be a number.',

            'quantity_received.min' =>
                'Quantity must be at least 1.',
        ]);

        // CREATE NEW BATCH
        $batch = MedicineBatch::create([

            'medicine_id' =>
                $request->medicine_id,

            'batch_number' =>
                $request->batch_number,

            'date_received' =>
                $request->date_received,

            'expiration_date' =>
                $request->expiration_date,

            'quantity_received' =>
                $request->quantity_received,

            // AUTO COMPUTE
            'quantity_remaining' =>
                $request->quantity_received,
        ]);

        // SUCCESS RESPONSE
        return response()->json([

            'message' =>
                'Medicine batch added successfully.',

            'batch' => $batch
        ]);
    }

    // UPDATE BATCH
    public function update(Request $request, $id)
    {
        $batch = MedicineBatch::findOrFail($id);

        // VALIDATION
        $request->validate([

            'medicine_id' =>
                'required',

            'batch_number' =>
                'required|unique:medicine_batches,batch_number,' . $id,

            'date_received' =>
                'required|before_or_equal:today',

            'expiration_date' =>
                'required|after:today',

            'quantity_received' =>
                'required|numeric|min:1',

        ], [

            // CUSTOM ERROR MESSAGES

            'medicine_id.required' =>
                'Medicine ID is required.',

            'batch_number.required' =>
                'Batch number is required.',

            'batch_number.unique' =>
                'Batch number already exists.',

            'date_received.required' =>
                'Date received is required.',

            'date_received.before_or_equal' =>
                'Date received cannot be in the future.',

            'expiration_date.required' =>
                'Expiration date is required.',

            'expiration_date.after' =>
                'Medicine is already expired.',

            'quantity_received.required' =>
                'Quantity received is required.',

            'quantity_received.numeric' =>
                'Quantity must be a number.',

            'quantity_received.min' =>
                'Quantity must be at least 1.',
        ]);

        // UPDATE DATA
        $batch->update([

            'medicine_id' =>
                $request->medicine_id,

            'batch_number' =>
                $request->batch_number,

            'date_received' =>
                $request->date_received,

            'expiration_date' =>
                $request->expiration_date,

            'quantity_received' =>
                $request->quantity_received,

            // AUTO COMPUTE
            'quantity_remaining' =>
                $request->quantity_received,
        ]);

        // SUCCESS RESPONSE
        return response()->json([

            'message' =>
                'Batch updated successfully.',

            'batch' => $batch
        ]);
    }

    // DELETE BATCH
    public function destroy($id)
    {
        $batch = MedicineBatch::findOrFail($id);

        $batch->delete();

        return response()->json([
            'message' => 'Batch deleted successfully.'
        ]);
    }
}