import { useState } from "react";
import { Link, useForm } from "@inertiajs/react";

export default function Index({ residents = [] }) {
    const [search, setSearch] = useState("");
    const { delete: destroy } = useForm();

    const destroyResident = (id) => {
        if (confirm("Are you sure you want to delete this resident?")) {
            destroy(`/residents/${id}`);
        }
    };

    const filteredResidents = residents.filter((resident) =>
        resident.full_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-8 font-sans antialiased">
            
            {/* Upper Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                        Residents List
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Barangay Health Center Management System
                    </p>
                </div>

                <Link
                    href="/residents/create"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#243c5a] hover:bg-[#1a2e47] text-white font-medium text-sm rounded-xl transition-all shadow-sm hover:shadow active:scale-95"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                    </svg>
                    Add Resident
                </Link>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                
                <div className="p-5 border-b border-slate-100 bg-white">
                    <div className="relative w-full max-w-md">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Search Resident by name..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent transition-all placeholder:text-slate-400 text-slate-700"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/75 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Full Name</th>
                                <th className="px-6 py-4">Age</th>
                                <th className="px-6 py-4">Date of Birth</th>
                                <th className="px-6 py-4">Gender</th>
                                <th className="px-6 py-4">Address</th>
                                <th className="px-6 py-4">Contact Number</th>
                                <th className="px-6 py-4 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                            {filteredResidents.length > 0 ? (
                                filteredResidents.map((resident) => (
                                    <tr key={resident.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                                            {resident.full_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {resident.age} yrs old
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {resident.date_of_birth}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                resident.gender === 'Male' || resident.gender === 'male'
                                                    ? 'bg-blue-50 text-blue-700' 
                                                    : 'bg-pink-50 text-pink-700'
                                            }`}>
                                                {resident.gender}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            {resident.address}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {resident.contact_number}
                                        </td>
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-2.5">
                                                <Link 
                                                    href={`/residents/${resident.id}`} 
                                                    className="text-slate-500 hover:text-slate-800 font-medium transition-colors"
                                                >
                                                    View
                                                </Link>
                                                <span className="text-slate-200">|</span>
                                                <Link 
                                                    href={`/residents/${resident.id}/edit`} 
                                                    className="text-indigo-600 hover:text-indigo-900 font-medium transition-colors"
                                                >
                                                    Edit
                                                </Link>
                                                <span className="text-slate-200">|</span>
                                                <button
                                                    onClick={() => destroyResident(resident.id)}
                                                    className="text-red-500 hover:text-red-700 font-medium transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-12 text-center text-slate-400 font-medium">
                                        No residents found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}