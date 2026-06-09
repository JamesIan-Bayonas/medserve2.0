import { useForm, Link } from '@inertiajs/react';

export default function Edit({ resident }) {

    const { data, setData, put, processing, errors } = useForm({
        full_name: resident.full_name || '',
        date_of_birth: resident.date_of_birth || '',
        age: resident.age || '',
        gender: resident.gender || '',
        address: resident.address || '',
        contact_number: resident.contact_number || '',
        emergency_contact_name: resident.emergency_contact_name || '',
        emergency_contact_relationship: resident.emergency_contact_relationship || '',
        emergency_contact_number: resident.emergency_contact_number || '',
        allergies: resident.allergies || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/residents/${resident.id}`);
    };


    const inputStyle = "mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-900 focus:border-[#243c5a] focus:outline-none focus:ring-1 focus:ring-[#243c5a] sm:text-sm transition-colors bg-slate-50 focus:bg-white";
    const labelStyle = "block text-sm font-semibold text-slate-700";

    return (
        <div className="min-h-screen bg-[#f8fafc] p-6 md:p-8 font-sans antialiased">
            
            {/* Header Section */}
            <div className="max-w-4xl mx-auto mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
                    Edit Resident
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Update the information of <span className="font-semibold text-slate-700">{resident.full_name}</span>.
                </p>
            </div>

            {/* Main Form Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <form onSubmit={submit} className="p-6 md:p-8 space-y-8">

                    {/* --- Resident Information Section --- */}
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Resident Information
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Full Name */}
                            <div className="md:col-span-2">
                                <label className={labelStyle}>Full Name</label>
                                <input
                                    type="text"
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    className={inputStyle}
                                />
                                {errors?.full_name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.full_name}</p>}
                            </div>

                            {/* Date of Birth & Age */}
                            <div>
                                <label className={labelStyle}>Date of Birth</label>
                                <input
                                    type="date"
                                    value={data.date_of_birth}
                                    onChange={(e) => {
                                        const dob = e.target.value;
                                        const birthDate = new Date(dob);
                                        const today = new Date();
                                        let calculatedAge = today.getFullYear() - birthDate.getFullYear();
                                        const monthDiff = today.getMonth() - birthDate.getMonth();

                                        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                                            calculatedAge--;
                                        }

                                        setData({
                                            ...data,
                                            date_of_birth: dob,
                                            age: isNaN(calculatedAge) ? '' : calculatedAge,
                                        });
                                    }}
                                    className={inputStyle}
                                />
                                {errors?.date_of_birth && <p className="mt-1 text-xs text-red-500 font-medium">{errors.date_of_birth}</p>}
                            </div>

                            <div>
                                <label className={labelStyle}>Age</label>
                                <input
                                    type="number"
                                    value={data.age}
                                    readOnly
                                    className="mt-1 block w-full rounded-xl border border-slate-200 px-4 py-2.5 text-slate-500 bg-slate-100 sm:text-sm cursor-not-allowed"
                                />
                            </div>

                            {/* Gender & Contact Number */}
                            <div>
                                <label className={labelStyle}>Gender</label>
                                <select
                                    value={data.gender}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    className={inputStyle}
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                                {errors?.gender && <p className="mt-1 text-xs text-red-500 font-medium">{errors.gender}</p>}
                            </div>

                            <div>
                                <label className={labelStyle}>Contact Number</label>
                                <input
                                    type="text"
                                    value={data.contact_number}
                                    onChange={(e) => setData('contact_number', e.target.value)}
                                    className={inputStyle}
                                />
                                {errors?.contact_number && <p className="mt-1 text-xs text-red-500 font-medium">{errors.contact_number}</p>}
                            </div>

                            {/* Address */}
                            <div className="md:col-span-2">
                                <label className={labelStyle}>Complete Address</label>
                                <input
                                    type="text"
                                    value={data.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    className={inputStyle}
                                />
                                {errors?.address && <p className="mt-1 text-xs text-red-500 font-medium">{errors.address}</p>}
                            </div>
                        </div>
                    </div>

                    {/* --- Emergency Contact Section --- */}
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Emergency Contact
                        </h2>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-red-50/30 p-5 rounded-xl border border-red-50">
                            <div className="md:col-span-2">
                                <label className={labelStyle}>Emergency Contact Name</label>
                                <input
                                    type="text"
                                    value={data.emergency_contact_name}
                                    onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>Relationship</label>
                                <input
                                    type="text"
                                    value={data.emergency_contact_relationship}
                                    onChange={(e) => setData('emergency_contact_relationship', e.target.value)}
                                    className={inputStyle}
                                />
                            </div>

                            <div>
                                <label className={labelStyle}>Contact Number</label>
                                <input
                                    type="text"
                                    value={data.emergency_contact_number}
                                    onChange={(e) => setData('emergency_contact_number', e.target.value)}
                                    className={inputStyle}
                                />
                            </div>
                        </div>
                    </div>

                    {/* --- Health Information Section --- */}
                    <div>
                        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">
                            Health Information
                        </h2>
                        
                        <div className="bg-emerald-50/30 p-5 rounded-xl border border-emerald-50">
                            <label className={labelStyle}>Known Allergies</label>
                            <textarea
                                value={data.allergies}
                                onChange={(e) => setData('allergies', e.target.value)}
                                rows="3"
                                className={`${inputStyle} resize-none`}
                            />
                        </div>
                    </div>

                    {/* --- Action Buttons --- */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                 
                        <Link
                            href="/residents"
                            className="px-5 py-2.5 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                        >
                            Cancel
                        </Link>
                        
                        {/* Update Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#243c5a] hover:bg-[#1a2e47] text-white font-medium text-sm rounded-xl transition-all shadow-sm ${processing ? 'opacity-70 cursor-not-allowed' : 'active:scale-95'}`}
                        >
                            {processing ? 'Updating...' : 'Update Resident'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}