<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use Inertia\Inertia; // Switched to Inertia for React frontend delivery

// Models
use App\Models\Resident;
use App\Models\User;
use App\Models\Medicine;
use App\Models\MedicineBatch; // Imported for your precise inventory tracking
use App\Models\Immunization;
use App\Models\ActivityLog;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // 1. Core Dashboard Statistics
        $totalResidents = Resident::count();
        $totalStaff = User::where('role', 'staff')->count();
        $totalMedicines = Medicine::count();
        $immunizationSchedules = Immunization::count();

        // 2. Your Feature Logic: Fetch precise low stock records
        $lowStockCollection = MedicineBatch::where('quantity_remaining', '<=', 20)
            ->where('quantity_remaining', '>', 0)
            ->orderBy('quantity_remaining', 'asc')
            ->get();
        
        // Dynamic statistical counts derived from your batch logic
        $lowStockCount = $lowStockCollection->count();

        // Fetch precise expiring records within 30 days
        $expiringCollection = MedicineBatch::where('expiration_date', '<=', Carbon::now()->addDays(30))
            ->where('quantity_remaining', '>', 0)
            ->orderBy('expiration_date', 'asc')
            ->get();

        $expiringMedicinesCount = $expiringCollection->count();

        // 3. Previews & Logs (Limited to latest 5 items for dashboard layout performance)
        $recentStaff = User::where('role', 'staff')
            ->latest()
            ->take(5)
            ->get();

        $recentResidents = Resident::latest()
            ->take(5)
            ->get();

        $recentActivities = ActivityLog::latest()
            ->take(5)
            ->get();

        // 4. Return everything to your Inertia React Component
        return Inertia::render('Admin/Dashboard', [
            // Structural Counts
            'totalResidents'        => $totalResidents,
            'totalStaff'            => $totalStaff,
            'totalMedicines'        => $totalMedicines,
            'lowStockCount'         => $lowStockCount,
            'expiringMedicinesCount'=> $expiringMedicinesCount,
            'immunizationSchedules' => $immunizationSchedules,

            // Preview Collections
            'recentStaff'           => $recentStaff,
            'recentResidents'       => $recentResidents,
            'recentActivities'      => $recentActivities,

            // Precise Feature Data Arrays passed directly down as props
            'lowStockBatches'       => $lowStockCollection,
            'expiringBatches'       => $expiringCollection,
        ]);
    }
}