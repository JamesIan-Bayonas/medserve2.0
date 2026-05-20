<?php

use App\Models\MedicineBatch;
use Carbon\Carbon;
use Inertia\Inertia;

use App\Http\Controllers\AdminDashboardController;

/*
|--------------------------------------------------------------------------
| WEB ROUTES
|--------------------------------------------------------------------------
*/

// ========================================
// DEFAULT ROUTE
// ========================================

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;
use App\Models\User;

Route::get('/', function () {

    return redirect('/login');

});

// ========================================
// AUTHENTICATED ROUTES
// ========================================

Route::middleware(['auth'])->group(function () {

    // =========================
    // MAIN DASHBOARD
    // =========================

    Route::get('/dashboard', function () {


        return redirect('/admin/dashboard');

    })->name('dashboard');

    // =========================
    // ADMIN DASHBOARD
    // =========================

    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

    // =========================
    // MEDICINE INVENTORY PAGE
    // =========================

    Route::get('/inventory', function () {

        return view('inventory');

    })->name('inventory');

    // =========================
    // MEDICINE BATCH PAGE
    // =========================

    Route::get('/medicine-batches-page', function () {

        return Inertia::render('MedicineBatches');

    })->name('medicine.batches');

});

// ========================================
// AUTH ROUTES
// ========================================


require __DIR__.'/auth.php';
