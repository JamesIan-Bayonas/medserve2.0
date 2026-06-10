<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class ResidentController extends Controller
{
    public function index()
    {
        $residents = Resident::latest()->get();

        return Inertia::render('Residents/Index', [
            'residents' => $residents,
        ]);
    }

    public function create()
    {
        return Inertia::render('Residents/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'full_name'                      => 'required|string|max:255',
                'date_of_birth'                  => 'required|date|before:today',
                'gender'                         => 'required|in:Male,Female',
                'address'                        => 'required|string|max:255',
                'contact_number'                 => ['nullable', 'regex:/^09\d{9}$/'],
                'guardian_name'                  => 'nullable|string|max:255',
                'emergency_contact_name'         => 'nullable|string|max:255',
                'emergency_contact_relationship' => 'nullable|string|max:100',
                'emergency_contact_number'       => ['nullable', 'regex:/^09\d{9}$/'],
                'allergies'                      => 'nullable|string|max:500',
            ],
            [
                'full_name.required'                 => 'Full Name is required.',
                'date_of_birth.required'             => 'Date of Birth is required.',
                'date_of_birth.before'               => 'Date of Birth must be before today.',
                'gender.required'                    => 'Please select a gender.',
                'address.required'                   => 'Address is required.',
                'contact_number.regex'               => 'Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
                'emergency_contact_number.regex'     => 'Emergency Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
            ]
        );

        $validated['age'] = Carbon::parse($validated['date_of_birth'])->age;

        Resident::create($validated);

        return redirect()->route('residents.index');
    }

    public function show(Resident $resident)
    {
        return Inertia::render('Residents/Show', [
            'resident' => $resident,
        ]);
    }

    public function edit(Resident $resident)
    {
        return Inertia::render('Residents/Edit', [
            'resident' => $resident,
        ]);
    }

    public function update(Request $request, Resident $resident)
    {
        $validated = $request->validate(
            [
                'full_name'                      => 'required|string|max:255',
                'date_of_birth'                  => 'required|date|before:today',
                'gender'                         => 'required|in:Male,Female',
                'address'                        => 'required|string|max:255',
                'contact_number'                 => ['nullable', 'regex:/^09\d{9}$/'],
                'guardian_name'                  => 'nullable|string|max:255',
                'emergency_contact_name'         => 'nullable|string|max:255',
                'emergency_contact_relationship' => 'nullable|string|max:100',
                'emergency_contact_number'       => ['nullable', 'regex:/^09\d{9}$/'],
                'allergies'                      => 'nullable|string|max:500',
            ],
            [
                'full_name.required'                 => 'Full Name is required.',
                'date_of_birth.required'             => 'Date of Birth is required.',
                'date_of_birth.before'               => 'Date of Birth must be before today.',
                'gender.required'                    => 'Please select a gender.',
                'address.required'                   => 'Address is required.',
                'contact_number.regex'               => 'Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
                'emergency_contact_number.regex'     => 'Emergency Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
            ]
        );

        $validated['age'] = Carbon::parse($validated['date_of_birth'])->age;

        $resident->update($validated);

        return redirect()->route('residents.index');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return redirect()->route('residents.index');
    }
}