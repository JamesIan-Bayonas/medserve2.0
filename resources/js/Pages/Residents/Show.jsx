import { Link } from "@inertiajs/react";

export default function Show({ resident }) {
    return (
    
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-8 font-sans antialiased">
            
            {/* Header Area with Back Button */}
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                        Resident Profile
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Detailed view of resident's information
                    </p>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Back Button */}
                    <Link
                        href="/residents"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-xl transition-all shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                        </svg>
                        Back to List
                    </Link>

                    {/* Edit Button */}
                    <Link
                        href={`/residents/${resident.id}/edit`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#243c5a] hover:bg-[#1a2e47] text-white font-medium text-sm rounded-xl transition-all shadow-sm"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                        </svg>
                        Edit
                    </Link>
                </div>
            </div>

            {/* Main Profile Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                
                {/* Profile Header Block */}
                <div className="bg-slate-50 border-b border-slate-100 p-6 flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-[#243c5a] text-white flex items-center justify-center text-2xl font-bold shadow-sm">
                        {resident.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-800">{resident.full_name}</h2>
                        <span className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            resident.gender === 'Male' || resident.gender === 'male'
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-pink-100 text-pink-700'
                        }`}>
                            {resident.gender}
                        </span>
                    </div>
                </div>

                {/* Information Sections */}
                <div className="p-6 md:p-8 space-y-8">
                    
                    {/* Section 1: Personal Information */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Personal Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Date of Birth</span>
                                <span className="text-sm font-medium text-slate-800">{resident.date_of_birth}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Age</span>
                                <span className="text-sm font-medium text-slate-800">{resident.age} years old</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Contact Number</span>
                                <span className="text-sm font-medium text-slate-800">{resident.contact_number || "N/A"}</span>
                            </div>
                            <div className="flex flex-col md:col-span-2 lg:col-span-3">
                                <span className="text-xs text-slate-500 mb-1">Home Address</span>
                                <span className="text-sm font-medium text-slate-800">{resident.address}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Emergency Contact */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Emergency Contact
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-red-50/50 rounded-xl border border-red-100">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Contact Name</span>
                                <span className="text-sm font-medium text-slate-800">{resident.emergency_contact_name || "N/A"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Relationship</span>
                                <span className="text-sm font-medium text-slate-800">{resident.emergency_contact_relationship || "N/A"}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Contact Number</span>
                                <span className="text-sm font-medium text-slate-800">{resident.emergency_contact_number || "N/A"}</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Health Information */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Health Information
                        </h3>
                        <div className="grid grid-cols-1 gap-6 p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 mb-1">Known Allergies</span>
                                <span className="text-sm font-medium text-slate-800">
                                    {resident.allergies ? resident.allergies : "No known allergies."}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}