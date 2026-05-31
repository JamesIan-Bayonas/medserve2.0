import React, { useState } from "react";

export default function MedicineDispensing() {
    const [searchResident, setSearchResident] = useState("");
    const [selectedResident, setSelectedResident] = useState(null);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [quantity, setQuantity] = useState("");
    const [dosage, setDosage] = useState("");
    const [records, setRecords] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);

    const residents = [
        {
            name: "Alyssa Faith S. Bagunbon",
            id: "2024-0012",
            purok: "Purok 1",
            initials: "AF",
            color: "#0F4C81",
        },
        {
            name: "Maria Pineda",
            id: "2024-0045",
            purok: "Purok 2",
            initials: "MP",
            color: "#6EE7A1",
        },
    ];

    const medicines = [
        { name: "Paracetamol", stock: 150 },
        { name: "Amoxicillin", stock: 85 },
        { name: "Vitamin C", stock: 200 },
    ];

    const filteredResidents = residents.filter((resident) =>
        resident.name.toLowerCase().includes(searchResident.toLowerCase())
    );

    const handleDispense = () => {
        if (!selectedResident) return alert("Please select a resident.");
        if (!selectedMedicine) return alert("Please select a medicine.");
        if (!quantity) return alert("Please enter quantity.");
        if (!dosage) return alert("Please enter dosage.");
        if (Number(quantity) <= 0) return alert("Quantity must be greater than 0.");
        if (Number(quantity) > selectedMedicine.stock) return alert("Not enough stock available.");

        const newRecord = {
            resident: selectedResident.name,
            medicine: selectedMedicine.name,
            quantity,
            dosage,
            date: new Date().toLocaleDateString(),
        };

        setRecords([newRecord, ...records]);
        alert("Medicine Dispensed Successfully!");

        // Reset all states back to Step 1
        setCurrentStep(1);
        setSelectedResident(null);
        setSelectedMedicine(null);
        setQuantity("");
        setDosage("");
    };

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-5xl font-bold text-slate-900">Dispensing Workflow</h1>
                <div className="flex gap-4 text-xl">
                    <span>🔔</span>
                    <span>⚙️</span>
                    <span>👤</span>
                </div>
            </div>

            {/* Stepper */}
            <div className="bg-white rounded-3xl p-8 border mb-8">
                <div className="flex items-center justify-between">
                    {/* Step 1 Indicator */}
                    <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${currentStep >= 1 ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800"}`}>
                            1
                        </div>
                        <span className="mt-2 font-semibold">Patient</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-blue-100 mx-4"></div>

                    {/* Step 2 Indicator */}
                    <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${currentStep >= 2 ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800"}`}>
                            2
                        </div>
                        <span className="mt-2 font-semibold">Medicine</span>
                    </div>

                    <div className="flex-1 h-[2px] bg-blue-100 mx-4"></div>

                    {/* Step 3 Indicator */}
                    <div className="flex flex-col items-center">
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ${currentStep === 3 ? "bg-blue-800 text-white" : "bg-blue-100 text-blue-800"}`}>
                            3
                        </div>
                        <span className="mt-2 font-semibold">Details</span>
                    </div>
                </div>
            </div>

            {/* ========================================= */}
            {/* STEP 1: Identify Resident                 */}
            {/* ========================================= */}
            {currentStep === 1 && (
                <div className="bg-white rounded-3xl border p-8 mb-8 shadow-sm">
                    <h2 className="text-4xl font-bold mb-3">Identify Resident</h2>
                    <p className="text-slate-500 mb-6">Search the master database to link this dispensing record.</p>

                    <label className="block text-sm font-semibold mb-2">Patient Name or ID</label>
                    <input
                        type="text"
                        value={searchResident}
                        onChange={(e) => setSearchResident(e.target.value)}
                        placeholder="Search by name, birthdate, or Patient ID..."
                        className="w-full border rounded-lg px-4 py-3 mb-6 focus:ring-2 focus:ring-blue-800 outline-none"
                    />

                    <div className="border rounded-lg overflow-hidden">
                        <div className="bg-slate-100 px-4 py-3 text-xs font-bold text-slate-500">
                            RECENT PATIENTS
                        </div>
                        {filteredResidents.map((resident, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedResident(resident);
                                    setCurrentStep(2); // Move to Step 2 immediately
                                }}
                                className="flex justify-between items-center p-4 border-t cursor-pointer hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl text-white font-bold flex items-center justify-center" style={{ backgroundColor: resident.color }}>
                                        {resident.initials}
                                    </div>
                                    <div>
                                        <div className="font-bold">{resident.name}</div>
                                        <div className="text-sm text-slate-500">ID: {resident.id} | {resident.purok}</div>
                                    </div>
                                </div>
                                <div className="text-2xl text-slate-400">→</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ========================================= */}
            {/* STEP 2: Select Medicine                   */}
            {/* ========================================= */}
            {currentStep === 2 && (
                <div className="bg-white rounded-3xl border p-8 mb-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">Select Medicine</h2>
                        <button onClick={() => setCurrentStep(1)} className="text-blue-600 font-semibold hover:underline">
                            ← Back to Patient
                        </button>
                    </div>

                    {/* Show Selected Resident Summary */}
                    <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
                        <h3 className="font-bold text-green-700 mb-1">Selected Resident</h3>
                        <p className="font-semibold text-lg">{selectedResident?.name}</p>
                        <p className="text-sm text-slate-600">ID: {selectedResident?.id} | {selectedResident?.purok}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {medicines.map((medicine, index) => (
                            <div
                                key={index}
                                onClick={() => {
                                    setSelectedMedicine(medicine);
                                    setCurrentStep(3); // Move to Step 3 immediately
                                }}
                                className="border rounded-xl p-5 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                            >
                                <div className="font-semibold text-lg mb-1">{medicine.name}</div>
                                <div className="text-sm text-slate-500">Stock Available: {medicine.stock}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ========================================= */}
            {/* STEP 3: Dispensing Details                */}
            {/* ========================================= */}
            {currentStep === 3 && (
                <div className="bg-white rounded-3xl border p-8 mb-8 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-4xl font-bold">Dispensing Details</h2>
                        <button onClick={() => setCurrentStep(2)} className="text-blue-600 font-semibold hover:underline">
                            ← Back to Medicine
                        </button>
                    </div>

                    {/* Summaries */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                            <h3 className="font-bold text-green-700 mb-1">Patient</h3>
                            <p className="font-semibold">{selectedResident?.name}</p>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                            <h3 className="font-bold text-blue-700 mb-1">Medicine</h3>
                            <p className="font-semibold">{selectedMedicine?.name} <span className="text-sm font-normal text-slate-500">(Stock: {selectedMedicine?.stock})</span></p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <label className="block mb-2 font-medium">Quantity</label>
                            <input
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-800 outline-none"
                                placeholder="Enter quantity"
                            />
                        </div>
                        <div>
                            <label className="block mb-2 font-medium">Dosage</label>
                            <input
                                type="text"
                                value={dosage}
                                onChange={(e) => setDosage(e.target.value)}
                                className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-800 outline-none"
                                placeholder="Example: 1 tablet 3x a day"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleDispense}
                        className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold text-lg transition-colors"
                    >
                        Confirm & Dispense Medicine
                    </button>
                </div>
            )}

            {/* Bottom Cards & Records Table */}
            <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="col-span-2 bg-white border rounded-2xl p-6">
                    <div className="flex gap-4">
                        <div className="text-3xl">📋</div>
                        <div>
                            <h3 className="font-bold">Inventory Guardrails</h3>
                            <p className="text-slate-500 text-sm">
                                System automatically flags low stock or near-expiry batches to prevent dispensing errors and stockouts.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue-900 text-white rounded-2xl p-6">
                    <div className="text-3xl mb-3">↺</div>
                    <div className="text-4xl font-bold">{records.length + 24}</div>
                    <div className="text-xs tracking-widest mt-1">DISPENSATIONS TODAY</div>
                </div>
            </div>
        </div>
    );
}