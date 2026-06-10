import { Head, Link } from '@inertiajs/react';

export default function Show({ checkup }) {
    return (
        <>
            <Head title="Checkup Details" />

            <div className="max-w-5xl mx-auto p-6 space-y-6">
                
                {/* --- Page Header --- */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Checkup Details
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Complete consultation and health assessment record.
                        </p>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {checkup.checkup_date}
                    </div>
                </div>

                {/* --- Main Content Card --- */}
                <div className="bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
                    <div className="p-6 md:p-8 space-y-8">

                        {/* Resident Information */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">
                                Resident Information
                            </h2>
                            <div className="bg-gray-50/50 rounded-xl p-5 border border-gray-100">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                    Full Name
                                </p>
                                <p className="font-bold text-xl text-gray-900">
                                    {checkup.resident?.full_name || 'Unknown Resident'}
                                </p>
                            </div>
                        </div>

                        {/* Vital Signs */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">
                                Vital Signs
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {/* BP */}
                                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-blue-200 transition-colors">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Blood Pressure
                                    </p>
                                    <p className="font-bold text-2xl text-blue-600 mt-2">
                                        {checkup.blood_pressure || 'N/A'}
                                    </p>
                                </div>

                                {/* Temperature */}
                                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-red-200 transition-colors">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Temperature
                                    </p>
                                    <p className="font-bold text-2xl text-red-500 mt-2">
                                        {checkup.temperature ? `${checkup.temperature} °C` : 'N/A'}
                                    </p>
                                </div>

                                {/* Weight */}
                                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-emerald-200 transition-colors">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Weight
                                    </p>
                                    <p className="font-bold text-2xl text-emerald-600 mt-2">
                                        {checkup.weight ? `${checkup.weight} kg` : 'N/A'}
                                    </p>
                                </div>

                                {/* Height */}
                                <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:border-purple-200 transition-colors">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Height
                                    </p>
                                    <p className="font-bold text-2xl text-purple-600 mt-2">
                                        {checkup.height ? `${checkup.height} cm` : 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Consultation Details */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">
                                Consultation Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Reason for Visit
                                    </p>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-700 min-h-[5rem]">
                                        {checkup.reason_for_visit || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Assessment
                                    </p>
                                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-700 min-h-[5rem]">
                                        {checkup.assessment || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Medicine Given
                                    </p>
                                    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 text-blue-900 min-h-[5rem]">
                                        {checkup.medicine_given || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Action Taken
                                    </p>
                                    <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-emerald-900 min-h-[5rem]">
                                        {checkup.action_taken || 'N/A'}
                                    </div>
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                        Additional Notes
                                    </p>
                                    <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4 text-amber-900 min-h-[5rem]">
                                        {checkup.notes || 'No additional notes provided.'}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Buttons Action Area */}
                        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-gray-100 mt-8">
                            <Link
                                href={route('checkups.index')}
                                className="inline-flex justify-center items-center px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors shadow-sm"
                            >
                                Back to Records
                            </Link>

                            <Link
                                href={route('checkups.edit', checkup.id)}
                                className="inline-flex justify-center items-center px-5 py-2.5 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition-colors shadow-sm"
                            >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit Checkup
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}