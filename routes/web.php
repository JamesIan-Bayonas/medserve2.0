<?php 

use App\Models\MedicineBatch;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StaffController;
 use App\Models\User;
 

Route::get('/', function () {
    return redirect('/login');
});

Route::middleware(['auth'])->group(function () {

Route::get('/dashboard', function () {
        // Fetch low stock items from your SQLite table
        $lowStock = MedicineBatch::where('quantity_remaining', '<=', 20)
            ->where('quantity_remaining', '>', 0)
            ->orderBy('quantity_remaining', 'asc')
            ->get();

        // Fetch expiring items within 30 days
        $expiring = MedicineBatch::where('expiration_date', '<=', Carbon::now()->addDays(30))
            ->where('quantity_remaining', '>', 0)
            ->orderBy('expiration_date', 'asc')
            ->get();

        return Inertia::render('Dashboard', [
            'totalResidents' => 0,
            'pendingImmunizations' => 0,
            'residents' => [],
            'dispensedMedicines' => [],
            'announcements' => [],
            'alerts' => [],
            
            // FIX: Match the exact variable keys your React component accepts!
            'lowStockBatches' => $lowStock,
            'expiringBatches' => $expiring,
        ]);
    })->name('dashboard');

    Route::get('/admin/dashboard', function () {
        return Inertia::render('Admin/Dashboard');
    })->middleware('admin')
      ->name('admin.dashboard');

    Route::get('/admin/create-staff', function () {
        return Inertia::render('Admin/CreateStaff');
    })->middleware('admin')
      ->name('admin.create-staff');

    Route::post('/admin/create-staff', [StaffController::class, 'store'])
        ->middleware('admin')
        ->name('admin.store-staff');

});

require __DIR__.'/auth.php';