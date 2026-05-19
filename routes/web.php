<?php

use App\Http\Controllers\AdminDashboardController;
use App\Http\Controllers\MedicineBatchController;
use App\Http\Controllers\MedicineDispensingController;
use App\Http\Controllers\ResidentController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\StaffDashboardController;
use App\Models\MedicineBatch;
use Carbon\Carbon;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | DASHBOARD REDIRECTOR & ALERTS MANAGEMENT
    |--------------------------------------------------------------------------
    */
    Route::get('/dashboard', function () {
        // Fetches low stock items from your SQLite table (20 or fewer remaining)
        $lowStock = MedicineBatch::where('quantity_remaining', '<=', 20)
            ->where('quantity_remaining', '>', 0)
            ->orderBy('quantity_remaining', 'asc')
            ->get();

        // Fetches expiring items within 30 days
        $expiring = MedicineBatch::where('expiration_date', '<=', Carbon::now()->addDays(30))
            ->where('quantity_remaining', '>', 0)
            ->orderBy('expiration_date', 'asc')
            ->get();

        // Renders the main Dashboard and passes the exact keys your React keys expect
        return Inertia::render('Dashboard', [
            'totalResidents' => 0,
            'pendingImmunizations' => 0,
            'residents' => [],
            'dispensedMedicines' => [],
            'announcements' => [],
            'alerts' => [],
            'lowStockBatches' => $lowStock,
            'expiringBatches' => $expiring,
        ]);
    })->name('dashboard');

    /*
    |--------------------------------------------------------------------------
    | ADMIN MODULES
    |--------------------------------------------------------------------------
    */
    // Clean Controller-driven endpoint from the main branch
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])
        ->name('admin.dashboard');

    Route::get('/admin/create-staff', function () {
        return Inertia::render('Admin/CreateStaff');
    })->middleware('admin')->name('admin.create-staff');

    Route::post('/admin/create-staff', [StaffController::class, 'store'])
        ->middleware('admin')->name('admin.store-staff');

    Route::get('/admin/reports', function () {
        return view('admin.reports');
    })->name('reports.index');

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
    
    // Clean resource endpoints for residents and checkups management panels
    Route::resource('residents', ResidentController::class);
    Route::resource('checkups', CheckupController::class);
});

require __DIR__.'/auth.php';