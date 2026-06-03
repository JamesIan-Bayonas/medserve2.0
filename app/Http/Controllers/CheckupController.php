<?php
namespace App\Http\Controllers;

use App\Models\Checkup;
use App\Models\Resident;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CheckupController extends Controller
{
    /**
     * Show the form for creating a new patient checkup.
     */
    public function create()
    {
        // Fetch residents list so health workers can choose patients from a select dropdown
        $residents = Resident::select('id', 'full_name', 'age', 'gender')->orderBy('full_name', 'asc')->get();

    return Inertia::render('Checkups/Create', [
            'residents' => $residents
        ]);
    }

    /**
     * Store a newly created checkup record in the database.
     */
    public function store(Request $request)
    {
        // 1. Strict validation mapping against your physical migrations structure
        $validated = $request->validate([
            'resident_id'     => 'required|exists:residents,id',
            'blood_pressure'  => 'required|string|max:20',
            'temperature'     => 'required|numeric|min:30|max:45',
            'heart_rate'      => 'nullable|integer',
            'weight'          => 'nullable|numeric',
            'height'          => 'nullable|numeric',
            'symptoms'        => 'required|string',
            'diagnosis'       => 'required|string',
        ]); 
        // Explicitly map the authenticated worker ID directly to the checkup data record
        $validated['user_id'] = Auth::id(); 

        // Persist the model records explicitly
        Checkup::create($validated);

        // 3. Return back to a secure history table with a feedback toast session alert
        return redirect()->route('dashboard')->with('success', 'Patient checkup recorded successfully!');
    }
}