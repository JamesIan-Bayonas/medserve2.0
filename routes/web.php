<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    */

    Route::get('/staff/dashboard', [StaffDashboardController::class, 'index'])
        ->name('staff.dashboard');


    /*
    |--------------------------------------------------------------------------
    | ADMIN DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::get('/dashboard', function () {

        return redirect('/admin/dashboard');

    })->name('dashboard');

    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');


    /*
    |--------------------------------------------------------------------------
    | INVENTORY
    |--------------------------------------------------------------------------
    */

    Route::get('/inventory', function () {

        return view('inventory');

    })->name('inventory');


    /*
    |--------------------------------------------------------------------------
    | MEDICINE BATCHES
    |--------------------------------------------------------------------------
    */

    Route::get('/medicine-batches-page', function () {

        return Inertia::render('MedicineBatches');

    })->name('medicine.batches');

    


    /*
    |--------------------------------------------------------------------------
    | RESIDENTS
    |--------------------------------------------------------------------------
    */

    Route::resource('residents', ResidentController::class);

});

require __DIR__.'/auth.php';