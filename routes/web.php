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

    // DASHBOARD & ALERTS
    Route::get('/dashboard', function () {
        $lowStock = MedicineBatch::where('quantity_remaining', '<=', 20)
            ->where('quantity_remaining', '>', 0)
            ->get();
        $expiring = MedicineBatch::where('expiration_date', '<=', Carbon::now()->addDays(30))
            ->get();
        return Inertia::render('Dashboard', [
            'lowStockBatches' => $lowStock,
            'expiringBatches' => $expiring,
        ]);
    })->name('dashboard');

    // ADMIN
    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    
    // INVENTORY
    Route::get('/inventory', function () { return view('inventory'); })->name('inventory');
    Route::get('/medicine-batches-page', function () { return Inertia::render('MedicineBatches'); })->name('medicine.batches');
});

require __DIR__.'/auth.php';
