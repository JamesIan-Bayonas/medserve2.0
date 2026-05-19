<?php

namespace App\Http\Controllers;

use App\Models\Medicine;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MedicineController extends Controller
{
    // =========================
    // DISPLAY ALL MEDICINES
    // =========================
    public function index(Request $request)
    {
        $query = Medicine::query();

        // SEARCH
        if ($request->search) {
            $query->where(function ($q) use ($request) {

                $q->where('name', 'LIKE', '%' . $request->search . '%')
                  ->orWhere('code', 'LIKE', '%' . $request->search . '%');
            });
        }

        // FILTER CATEGORY
        if ($request->category) {
            $query->where('category', $request->category);
        }

        $medicines = $query->orderBy('name')->get();

        return response()->json([
            'success' => true,
            'data' => $medicines
        ]);
    }

    // =========================
    // STORE MEDICINE
    // =========================
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:255',
            'code' => 'nullable|string',
            'category' => 'nullable|string',
            'unit' => 'required|string',

            'current_stock' => 'required|integer|min:0',

            'minimum_stock' => 'nullable|integer',

            'expiration_date' => 'nullable|date'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $medicine = Medicine::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Medicine added successfully',
            'data' => $medicine
        ]);
    }

    // =========================
    // EDIT / UPDATE
    // =========================
    public function update(Request $request, Medicine $medicine)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:255',
            'unit' => 'required|string',
            'current_stock' => 'required|integer|min:0',
            'expiration_date' => 'nullable|date'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $medicine->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Medicine updated successfully'
        ]);
    }

    // =========================
    // DELETE
    // =========================
    public function destroy(Medicine $medicine)
    {
        $medicine->delete();

        return response()->json([
            'success' => true,
            'message' => 'Medicine deleted successfully'
        ]);
    }

    // =========================
    // ADJUST STOCK
    // =========================
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
            'message' => 'Stock updated successfully',
            'current_stock' => $medicine->current_stock
        ]);
    }
}