<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use App\Models\Medicine;
use App\Models\Immunization;

class StaffDashboardController extends Controller
{
    public function index()
    {
        $totalResidents = 0;

        $todayCheckups = 0;

        $totalStaff = 0;

        $totalMedicines = Medicine::count();

        $lowStockCount = 0;

        $expiringMedicines = 0;

        $immunizationSchedules = Immunization::count();

        return view('staff.dashboard', compact(
            'totalResidents',
            'todayCheckups',
            'totalMedicines',
            'lowStockCount',
            'expiringMedicines',
            'immunizationSchedules',
            'totalStaff'
        ));
    }
}