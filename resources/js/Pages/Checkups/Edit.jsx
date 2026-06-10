import React, { useState, useMemo } from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ checkup, residents }) {
    // State for the search bar
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, put, processing, errors } = useForm({
        resident_id: checkup.resident_id || '',
        checkup_date: checkup.checkup_date || '',

        blood_pressure: checkup.blood_pressure || '',
        temperature: checkup.temperature || '',
        weight: checkup.weight || '',
        height: checkup.height || '',

        reason_for_visit: checkup.reason_for_visit || '',
        assessment: checkup.assessment || '',

        medicine_given: checkup.medicine_given || '',
        action_taken: checkup.action_taken || '',

        notes: checkup.notes || '',
    });

    // Filter residents based on search query
    const filteredResidents = useMemo(() => {
        if (!searchQuery) return residents;
        return residents.filter(resident =>
            resident.full_name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [residents, searchQuery]);

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('checkups.update', checkup.id));
    };

    return (
        <>
            <Head title="Edit Checkup" />

            <div className="max-w-5xl mx-auto p-6">
                <div className="bg-white shadow-md rounded-xl p-8 border border-gray-100">
                    
                    <div className="mb-8 border-b pb-4">
                        <h1 className="text-3xl font-bold text-gray-800">
                            Edit Checkup
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Update resident consultation and health assessment records.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">

                        {/* --- Resident & Date Section --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Resident with Search */}
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Resident
                                </label>
                                
                                {/* Search Input */}
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="Search resident name..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Filtered Select Dropdown */}
                                <select
                                    value={data.resident_id}
                                    onChange={(e) => setData('resident_id', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-50 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm"
                                >
                                    <option value="">Select Resident</option>
                                    {filteredResidents.length > 0 ? (
                                        filteredResidents.map((resident) => (
                                            <option key={resident.id} value={resident.id}>
                                                {resident.full_name}
                                            </option>
                                        ))
                                    ) : (
                                        <option value="" disabled>No residents found</option>
                                    )}
                                </select>
                            </div>

                            {/* Checkup Date */}
                            <div className="space-y-2">
                                <label className="block font-semibold text-gray-700">
                                    Checkup Date
                                </label>
                                <input
                                    type="date"
                                    value={data.checkup_date}
                                    onChange={(e) => setData('checkup_date', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all shadow-sm h-[calc(100%-2rem)] mt-2"
                                />
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* --- Vital Signs Section --- */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Vital Signs</h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Pressure</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. 120/80"
                                        value={data.blood_pressure}
                                        onChange={(e) => setData('blood_pressure', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="36.5"
                                        value={data.temperature}
                                        onChange={(e) => setData('temperature', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="0.0"
                                        value={data.weight}
                                        onChange={(e) => setData('weight', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        placeholder="0.0"
                                        value={data.height}
                                        onChange={(e) => setData('height', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-200" />

                        {/* --- Consultation Details Section --- */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-semibold text-gray-800">Consultation Details</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block font-medium text-gray-700 mb-2">Reason for Visit</label>
                                    <textarea
                                        rows="3"
                                        value={data.reason_for_visit}
                                        onChange={(e) => setData('reason_for_visit', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700 mb-2">Assessment</label>
                                    <textarea
                                        rows="3"
                                        value={data.assessment}
                                        onChange={(e) => setData('assessment', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700 mb-2">Medicine Given</label>
                                    <textarea
                                        rows="3"
                                        value={data.medicine_given}
                                        onChange={(e) => setData('medicine_given', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                    />
                                </div>

                                <div>
                                    <label className="block font-medium text-gray-700 mb-2">Action Taken</label>
                                    <textarea
                                        rows="3"
                                        value={data.action_taken}
                                        onChange={(e) => setData('action_taken', e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-medium text-gray-700 mb-2">Notes / Remarks</label>
                                <textarea
                                    rows="2"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 shadow-sm"
                                />
                            </div>
                        </div>

                        {/* --- Action Buttons --- */}
                        <div className="flex justify-end gap-3 pt-6 border-t mt-8">
                            <Link
                                href={route('checkups.index')}
                                className="px-6 py-2.5 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className={`px-6 py-2.5 text-white font-medium rounded-lg transition-all shadow-sm ${
                                    processing 
                                    ? 'bg-green-400 cursor-not-allowed' 
                                    : 'bg-green-600 hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2'
                                }`}
                            >
                                {processing ? 'Updating...' : 'Update Checkup'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}