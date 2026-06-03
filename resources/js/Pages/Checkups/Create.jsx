import React from 'react';
import { useForm, Head, Link } from '@inertiajs/react';

export default function Create({ residents }) {
    // Harness Inertia's data transfer state tracker engine
    const { data, setData, post, processing, errors } = useForm({
        resident_id: '',
        blood_pressure: '',
        temperature: '',
        heart_rate: '',
        weight: '',
        height: '',
        symptoms: '',
        diagnosis: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('checkups.store'));
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 mt-10">
            <Head title="Record Patient Checkup" />
            
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800">New Patient Checkup</h1>
                <p className="text-sm text-slate-500">Log patient vital signs, symptoms, and clinical summary evaluations.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Resident Selector */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Select Patient / Resident</label>
                    <select 
                        className="w-full p-3 border rounded-xl bg-slate-50 outline-none focus:ring-2 focus:ring-blue-500"
                        value={data.resident_id}
                        onChange={e => setData('resident_id', e.target.value)}
                    >
                        <option value="">-- Choose a Resident --</option>
                        {residents.map(resident => (
                            <option key={resident.id} value={resident.id}>
                                {resident.full_name} ({resident.gender}, Age: {resident.age})
                            </option>
                        ))}
                    </select>
                    {errors.resident_id && <span className="text-red-500 text-xs mt-1 block">{errors.resident_id}</span>}
                </div>

                {/* Vitals Grid Block */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Blood Pressure (mmHg)</label>
                        <input type="text" placeholder="e.g. 120/80" className="w-full p-3 border rounded-xl outline-none" value={data.blood_pressure} onChange={e => setData('blood_pressure', e.target.value)} />
                        {errors.blood_pressure && <span className="text-red-500 text-xs mt-1 block">{errors.blood_pressure}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Temperature (°C)</label>
                        <input type="number" step="0.1" placeholder="e.g. 36.5" className="w-full p-3 border rounded-xl outline-none" value={data.temperature} onChange={e => setData('temperature', e.target.value)} />
                        {errors.temperature && <span className="text-red-500 text-xs mt-1 block">{errors.temperature}</span>}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Heart Rate (BPM)</label>
                        <input type="number" placeholder="e.g. 72" className="w-full p-3 border rounded-xl outline-none" value={data.heart_rate} onChange={e => setData('heart_rate', e.target.value)} />
                    </div>
                </div>

                {/* Patient Biometrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Weight (kg)</label>
                        <input type="number" step="0.1" className="w-full p-3 border rounded-xl outline-none" value={data.weight} setData={e => setData('weight', e.target.value)} onChange={e => setData('weight', e.target.value)} />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Height (cm)</label>
                        <input type="number" step="0.1" className="w-full p-3 border rounded-xl outline-none" value={data.height} onChange={e => setData('height', e.target.value)} />
                    </div>
                </div>

                {/* Clinical Notes Texts */}
                <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Symptoms / Presenting Complaints</label>
                    <textarea rows="3" placeholder="Describe clinical indications..." className="w-full p-3 border rounded-xl outline-none" value={data.symptoms} onChange={e => setData('symptoms', e.target.value)}></textarea>
                    {errors.symptoms && <span className="text-red-500 text-xs mt-1 block">{errors.symptoms}</span>}
                </div>

                <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase mb-2">Diagnosis / Clinical Impression</label>
                    <textarea rows="3" placeholder="Enter findings or prescription rules..." className="w-full p-3 border rounded-xl outline-none" value={data.diagnosis} onChange={e => setData('diagnosis', e.target.value)}></textarea>
                    {errors.diagnosis && <span className="text-red-500 text-xs mt-1 block">{errors.diagnosis}</span>}
                </div>

                {/* Action Controls */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t">
                    <Link href={route('dashboard')} className="px-5 py-3 border text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition">
                        Cancel
                    </Link>
                    <button type="submit" disabled={processing} className="px-6 py-3 bg-[#1e3a5f] text-white font-semibold rounded-xl shadow-md hover:bg-opacity-90 transition disabled:opacity-50">
                        {processing ? 'Saving Record...' : 'Save Checkup Record'}
                    </button>
                </div>
            </form>
        </div>
    );
}