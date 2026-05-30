<?php

use App\Models\MedicineBatch;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;
use App\Models\User;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StaffDashboardController;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | STAFF DASHBOARD
    |--------------------------------------------------------------------------
    |*/
    Route::get('/staff/dashboard', [StaffDashboardController::class, 'index'])
        ->name('staff.dashboard');


    /*
    |--------------------------------------------------------------------------
    | ADMIN DASHBOARD
    |--------------------------------------------------------------------------
    |*/
    // Redirect standard /dashboard down to the specific admin panel
    Route::get('/dashboard', function () {
        return redirect('/admin/dashboard');
    })->name('dashboard');

    // Controller-driven endpoint for the real admin view
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

    // Kept your Admin staff creation features from the HEAD changes!
    Route::get('/admin/create-staff', function () {
        return Inertia::render('Admin/CreateStaff');
    })->middleware('admin')->name('admin.create-staff');

    Route::post('/admin/create-staff', [StaffController::class, 'store'])
        ->middleware('admin')->name('admin.store-staff');


    /*
    |--------------------------------------------------------------------------
    | INVENTORY
    |--------------------------------------------------------------------------
    |*/
    Route::get('/inventory', function () {
        return view('inventory');
    })->name('inventory');


    /*
    |--------------------------------------------------------------------------
    | MEDICINE BATCHES
    |--------------------------------------------------------------------------
    |*/
    Route::get('/medicine-batches-page', function () {
        return Inertia::render('MedicineBatches');
    })->name('medicine.batches');

    
    /*
    |--------------------------------------------------------------------------
    | RESIDENTS
    |--------------------------------------------------------------------------
    |*/
    Route::resource('residents', ResidentController::class);

});

require __DIR__.'/auth.php';