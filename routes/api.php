<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\DispensationController;
use App\Http\Controllers\MedicineController;
use App\Http\Controllers\MedicineBatchController;

/*
|--------------------------------------------------------------------------
| API ROUTES
|--------------------------------------------------------------------------
*/

// ========================================
// PUBLIC AUTH ROUTES
// ========================================

//Route::post('/login', [AuthController::class, 'login']);

// ========================================
// MEDICINE INVENTORY API
// ========================================

Route::get('/medicines', [MedicineController::class, 'index']);

Route::post('/medicines', [MedicineController::class, 'store']);

Route::put('/medicines/{medicine}', [MedicineController::class, 'update']);

Route::delete('/medicines/{medicine}', [MedicineController::class, 'destroy']);

Route::post(
    '/medicines/{medicine}/adjust-stock',
    [MedicineController::class, 'adjustStock']
);

// ========================================
// MEDICINE BATCH TRACKING API
// ========================================

Route::get('/batches', [MedicineBatchController::class, 'index']);

Route::post('/batches', [MedicineBatchController::class, 'store']);

Route::put('/batches/{id}', [MedicineBatchController::class, 'update']);

Route::delete('/batches/{id}', [MedicineBatchController::class, 'destroy']);

// ========================================
// PROTECTED ROUTES
// ========================================

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {

        return $request->user();

    });

   // Route::post('/logout', [AuthController::class, 'logout']);

    // =========================
    // DISPENSATION
    // =========================

    Route::middleware('role:Admin|Health Worker')->group(function () {

        Route::post('/dispense', [DispensationController::class, 'store']);

    });

});
