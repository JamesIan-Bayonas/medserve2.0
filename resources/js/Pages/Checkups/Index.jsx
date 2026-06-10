import React, { useState, useMemo } from 'react';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ checkups }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleDelete = (id) => {
        if (
            confirm(
                'Are you sure you want to delete this checkup record?'
            )
        ) {
            router.delete(route('checkups.destroy', id));
        }
    };

    // Filter checkups based on resident name search
    const filteredCheckups = useMemo(() => {
        if (!searchQuery) return checkups;
        return checkups.filter((checkup) =>
            checkup.resident?.full_name
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase())
        );
    }, [checkups, searchQuery]);

    return (
        <>
            <Head title="Checkup Records" />

            <div className="max-w-7xl mx-auto p-6 space-y-6">

                {/* --- Header Section --- */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Checkup Records
                        </h1>
                        <p className="text-gray-500 mt-1">
                            Manage resident consultation and health assessment records.
                        </p>
                    </div>

                    <Link
                        href={route('checkups.create')}
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow-sm transition-all whitespace-nowrap"
                    >
                        <svg className="w-5 h-5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Add Checkup
                    </Link>
                </div>

                {/* --- Controls Section (Stats & Search) --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    {/* Summary Card */}
                    <div className="bg-white shadow-sm rounded-xl p-5 border border-gray-100 flex items-center justify-between col-span-1">
                        <div>
                            <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">
                                Total Checkup Records
                            </p>
                            <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                {checkups.length}
                            </h2>
                        </div>
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                        </div>
                    </div>

                    {/* Table Search Bar */}
                    <div className="relative md:col-span-2 w-full">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search by resident name..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all shadow-sm text-sm"
                        />
                    </div>
                </div>

                {/* --- Table Container --- */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs uppercase bg-gray-50 text-gray-700 border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Resident</th>
                                    <th className="px-6 py-4 font-semibold">Checkup Date</th>
                                    <th className="px-6 py-4 font-semibold">Blood Pressure</th>
                                    <th className="px-6 py-4 font-semibold">Temperature</th>
                                    <th className="px-6 py-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {filteredCheckups.length > 0 ? (
                                    filteredCheckups.map((checkup) => (
                                        <tr
                                            key={checkup.id}
                                            className="hover:bg-gray-50/70 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-semibold text-gray-900">
                                                {checkup.resident?.full_name || 'Unknown Resident'}
                                            </td>

                                            <td className="px-6 py-4 text-gray-600">
                                                {checkup.checkup_date}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md text-xs font-medium border border-blue-100">
                                                    {checkup.blood_pressure || '—'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-1 bg-red-50 text-red-700 rounded-md text-xs font-medium border border-red-100">
                                                    {checkup.temperature
                                                        ? `${checkup.temperature} °C`
                                                        : '—'}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Link
                                                        href={route('checkups.show', checkup.id)}
                                                        className="px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium rounded-lg text-xs border transition-all"
                                                    >
                                                        View
                                                    </Link>

                                                    <Link
                                                        href={route('checkups.edit', checkup.id)}
                                                        className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-medium rounded-lg text-xs border border-emerald-100 transition-all"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        onClick={() => handleDelete(checkup.id)}
                                                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-medium rounded-lg text-xs border border-rose-100 transition-all"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="py-16 text-center"
                                        >
                                            <div className="flex flex-col items-center max-w-sm mx-auto">
                                                <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center text-2xl shadow-inner mb-4">
                                                    🩺
                                                </div>

                                                <h3 className="text-base font-bold text-gray-700">
                                                    {searchQuery ? 'No Matching Records' : 'No Checkup Records Found'}
                                                </h3>

                                                <p className="text-gray-400 text-xs text-center mt-1">
                                                    {searchQuery 
                                                        ? 'Try checking your spelling or search for another resident name.' 
                                                        : 'Start by logging your very first resident clinical checkup summary.'}
                                                </p>

                                                {!searchQuery && (
                                                    <Link
                                                        href={route('checkups.create')}
                                                        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow-sm transition-all"
                                                    >
                                                        Add New Checkup
                                                    </Link>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
}