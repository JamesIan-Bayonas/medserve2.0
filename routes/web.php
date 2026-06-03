<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\MedicineDispensingController;
use App\Http\Controllers\CheckupController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StaffDashboardController;
use App\Http\Controllers\MedicineBatchController; // Future target for inventory
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD REDIRECTOR
    |--------------------------------------------------------------------------
    */
    Route::get('/dashboard', function () {
        return redirect('/admin/dashboard');
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | ADMIN MODULES
    |--------------------------------------------------------------------------
    */
    // Controller handles the data query logic, completely eliminating the inline closures!
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

    Route::get('/admin/create-staff', function () {
        return Inertia::render('Admin/CreateStaff');
    })->middleware('admin')->name('admin.create-staff');

    Route::post('/admin/create-staff', [StaffController::class, 'store'])
        ->middleware('admin')->name('admin.store-staff');

    /*
    |--------------------------------------------------------------------------
    | STAFF MODULES
    |--------------------------------------------------------------------------
    */
    Route::get('/staff/dashboard', [StaffDashboardController::class, 'index'])
        ->name('staff.dashboard');

    /*
    |--------------------------------------------------------------------------
    | MEDICAL LOGISTICS & WORKFLOWS (PURE INERTIA/REACT REPO PATHS)
    |--------------------------------------------------------------------------
    */
    Route::get('/medicine-batches-page', function () {
        return Inertia::render('MedicineBatches');
    })->name('medicine.batches');

    Route::get('/medicine-dispensing', function () {
        return Inertia::render('MedicineDispensing');
    })->name('medicine.dispensing');

    Route::post('/medicine-dispensing', [MedicineDispensingController::class, 'store']);
    
    // Clean resource endpoints for residents management panel
    Route::resource('residents', ResidentController::class);

    Route::resource('checkups', CheckupController::class);
    
});

require __DIR__.'/auth.php';