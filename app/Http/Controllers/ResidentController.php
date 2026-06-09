<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
                'full_name' => 'required|string|max:255',

                'date_of_birth' => 'required|date|before:today',

                'age' => 'required|integer|min:0|max:150',

                'gender' => 'required|in:Male,Female',

                'address' => 'required|string|max:255',

                'contact_number' => [
                    'nullable',
                    'regex:/^09\d{9}$/',
                ],

                'emergency_contact_name' => 'nullable|string|max:255',

                'emergency_contact_relationship' => 'nullable|string|max:100',

                'emergency_contact_number' => [
                    'nullable',
                    'regex:/^09\d{9}$/',
                ],

                'allergies' => 'nullable|string|max:500',
            ],
            [
                'full_name.required' =>
                    'Full Name is required.',

                'date_of_birth.required' =>
                    'Date of Birth is required.',

                'date_of_birth.before' =>
                    'Date of Birth must be before today.',

                'age.required' =>
                    'Age is required.',

                'age.min' =>
                    'Age cannot be negative.',

                'age.max' =>
                    'Age cannot exceed 150.',

                'gender.required' =>
                    'Please select a gender.',

                'address.required' =>
                    'Address is required.',

                'contact_number.regex' =>
                    'Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',

                'emergency_contact_number.regex' =>
                    'Emergency Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
            ]
        );

        Resident::create($validated);

        return redirect()->route('residents.index');
    }

    public function show($id)
    {
        $resident = Resident::findOrFail($id);

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
                'full_name' => 'required|string|max:255',

                'date_of_birth' => 'required|date|before:today',

                'age' => 'required|integer|min:0|max:150',

                'gender' => 'required|in:Male,Female',

                'address' => 'required|string|max:255',

                'contact_number' => [
                    'nullable',
                    'regex:/^09\d{9}$/',
                ],

                'emergency_contact_name' => 'nullable|string|max:255',

                'emergency_contact_relationship' => 'nullable|string|max:100',

                'emergency_contact_number' => [
                    'nullable',
                    'regex:/^09\d{9}$/',
                ],

                'allergies' => 'nullable|string|max:500',
            ],
            [
                'full_name.required' =>
                    'Full Name is required.',

                'date_of_birth.required' =>
                    'Date of Birth is required.',

                'date_of_birth.before' =>
                    'Date of Birth must be before today.',

                'age.required' =>
                    'Age is required.',

                'age.min' =>
                    'Age cannot be negative.',

                'age.max' =>
                    'Age cannot exceed 150.',

                'gender.required' =>
                    'Please select a gender.',

                'address.required' =>
                    'Address is required.',

                'contact_number.regex' =>
                    'Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',

                'emergency_contact_number.regex' =>
                    'Emergency Contact Number must be a valid 11-digit mobile number (09xxxxxxxxx).',
            ]
        );

        $resident->update($validated);

        return redirect()->route('residents.index');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();

        return redirect()->route('residents.index');
    }
}