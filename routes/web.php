<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StaffDashboardController;
use App\Http\Controllers\MedicineDispensingController;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

    Route::get('/staff/dashboard', [StaffDashboardController::class, 'index'])
        ->name('staff.dashboard');

    Route::get('/dashboard', function () {
        return redirect('/admin/dashboard');
    })->name('dashboard');

    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');
        Route::get('/admin/reports', function () {
            return view('admin.reports');
        })->name('reports.index');

    Route::get('/medicine-batches-page', function () {
        return Inertia::render('MedicineBatches');
    })->name('medicine.batches');

    Route::get('/medicine-dispensing', function () {
        return Inertia::render('MedicineDispensing');
    })->name('medicine.dispensing');

    Route::post('/medicine-dispensing', [MedicineDispensingController::class, 'store']);

    Route::resource('residents', ResidentController::class);

});

require __DIR__.'/auth.php';