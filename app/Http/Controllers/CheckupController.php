<?php

namespace App\Http\Controllers;

use App\Models\Checkup;
use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckupController extends Controller
{
    /**
     * Display all checkups.
     */
    public function index()
    {
        $checkups = Checkup::with('resident')
            ->latest()
            ->get();

        return Inertia::render('Checkups/Index', [
            'checkups' => $checkups,
        ]);
    }

    /**
     * Show create form.
     */
    public function create()
    {
        $residents = Resident::select(
            'id',
            'full_name',
            'age',
            'gender'
        )
        ->orderBy('full_name')
        ->get();

        return Inertia::render('Checkups/Create', [
            'residents' => $residents,
        ]);
    }

    /**
     * Store new checkup.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'checkup_date' => 'required|date',

            'blood_pressure' => 'nullable|string|max:20',
            'temperature' => 'nullable|numeric',
            'weight' => 'nullable|numeric',
            'height' => 'nullable|numeric',

            'reason_for_visit' => 'required|string',
            'assessment' => 'nullable|string',

            'medicine_given' => 'nullable|string',
            'action_taken' => 'nullable|string',

            'notes' => 'nullable|string',
        ]);

        Checkup::create($validated);

        return redirect()
            ->route('checkups.index')
            ->with('success', 'Checkup recorded successfully.');
    }

    /**
     * Show specific checkup.
     */
    public function show(Checkup $checkup)
    {
        $checkup->load('resident');

        return Inertia::render('Checkups/Show', [
            'checkup' => $checkup,
        ]);
    }

    /**
     * Show edit form.
     */
    public function edit(Checkup $checkup)
    {
        $checkup->load('resident');

        $residents = Resident::select(
            'id',
            'full_name',
            'age',
            'gender'
        )
        ->orderBy('full_name')
        ->get();

        return Inertia::render('Checkups/Edit', [
            'checkup' => $checkup,
            'residents' => $residents,
        ]);
    }

    /**
     * Update checkup.
     */
    public function update(Request $request, Checkup $checkup)
    {
        $validated = $request->validate([
            'resident_id' => 'required|exists:residents,id',
            'checkup_date' => 'required|date',

            'blood_pressure' => 'nullable|string|max:20',
            'temperature' => 'nullable|numeric',
            'weight' => 'nullable|numeric',
            'height' => 'nullable|numeric',

            'reason_for_visit' => 'required|string',
            'assessment' => 'nullable|string',

            'medicine_given' => 'nullable|string',
            'action_taken' => 'nullable|string',

            'notes' => 'nullable|string',
        ]);

        $checkup->update($validated);

        return redirect()
            ->route('checkups.index')
            ->with('success', 'Checkup updated successfully.');
    }

    /**
     * Delete checkup.
     */
    public function destroy(Checkup $checkup)
    {
        $checkup->delete();

        return redirect()
            ->route('checkups.index')
            ->with('success', 'Checkup deleted successfully.');
    }
}