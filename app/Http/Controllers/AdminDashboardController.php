<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Resident;
use App\Models\User;
use App\Models\Medicine;
use App\Models\Immunization;
use App\Models\ActivityLog;
use App\Models\Checkup;

class AdminDashboardController extends Controller
{
    public function index()
    {
        // Dashboard Statistics
        $totalResidents = Resident::count();

        $totalStaff = User::where('role', 'staff')->count();

        $totalMedicines = Medicine::count();

       $lowStockCount = 0;


        $expiringMedicines = 0;

        $immunizationSchedules = Immunization::count();

        // Staff List Preview
        $recentStaff = User::where('role', 'staff')
            ->latest()
            ->take(5)
            ->get();

        // Resident List Preview
        $recentResidents = Resident::latest()
            ->take(5)
            ->get();

        // Recent Activities
        $recentActivities = ActivityLog::latest()
            ->take(5)
            ->get();

        // Recent Medicine Updates
        $recentMedicineUpdates = Medicine::latest()
            ->take(5)
            ->get();

        // Recent Immunization Records
        $recentImmunizations = Immunization::latest()
            ->take(5)
            ->get();

        return view('admin.dashboard', compact(
            'totalResidents',
            'totalStaff',
            'totalMedicines',
            'lowStockCount',
            'expiringMedicines',
            'immunizationSchedules',
            'recentStaff',
            'recentResidents',
            'recentActivities',
            'recentMedicineUpdates',
            'recentImmunizations'
        ));
    }
}