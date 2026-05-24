<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MedicineDispensingController;
use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StaffDashboardController;
use App\Models\MedicineDispensing;
use App\Models\Medicine;



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

 Route::get('/medicine-inventory', function () {

    return Inertia::render('MedicineInventory');

})->name('medicine.inventory');


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

    Route::post('/medicine-dispensing', [MedicineDispensingController::class, 'store']);
    

});
Route::get('/test-dispense', function () {

    $medicine = Medicine::find(1);

    if (!$medicine) {
        return 'Medicine not found';
    }

    if ($medicine->current_stock < 5) {
        return 'Insufficient stock';
    }

    MedicineDispensing::create([
        'resident_id' => 1,
        'medicine_id' => 1,
        'quantity' => 5,
        'dosage' => '1 tablet',
        'instructions' => 'After meal',
        'staff_id' => 1,
    ]);

    $medicine->current_stock -= 5;
    $medicine->save();

    return 'Dispensing success';
});

Route::get('/medicine-dispensing', function () {
    return Inertia::render('MedicineDispensing');
});



Route::post('/medicine-dispensing', [MedicineDispensingController::class, 'store']);

Route::get('/medicine-dispensing-history', [MedicineDispensingController::class, 'history']);

require __DIR__.'/auth.php';