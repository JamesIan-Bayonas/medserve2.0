<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicineController extends Controller
{
    public function index()
    {
        $medicines = Medicine::orderBy('name')->get();
        return response()->json(['success' => true, 'data' => $medicines]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'          => 'required|string|max:255',
            'code'          => 'nullable|string',
            'category'      => 'nullable|string',
            'unit'          => 'required|string',
            'current_stock' => 'required|integer|min:0',
            'minimum_stock' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $existing = Medicine::where('name', $request->name)->first();
        if ($existing) {
            $existing->increment('current_stock', $request->current_stock ?? 1);
            return response()->json([
                'success' => true,
                'message' => "Stock increased! New stock: {$existing->current_stock}"
            ]);
        }

        $medicine = Medicine::create($request->all());
        return response()->json([
            'success' => true,
            'message' => 'Medicine added successfully',
            'data' => $medicine
        ], 201);
    }

    public function adjustStock(Request $request, Medicine $medicine)
{
     $qty = (int) $request->quantity;

     if ($qty == 0) {
        return response()->json([
            'success' => false,
            'message' => 'Quantity cannot be zero'
        ], 422);
     }

     $newStock = $medicine->current_stock + $qty;

     if ($newStock < 0) {
        return response()->json([
            'success' => false,
            'message' => 'Stock cannot go below zero'
        ], 422);
     }

     $medicine->current_stock = $newStock;
     $medicine->save();

     return response()->json([
        'success' => true,
        'message' => "Stock updated successfully",
        'current_stock' => $medicine->current_stock
     ]);
}
}