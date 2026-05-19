
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

import {
    LayoutDashboard,
    UserPlus,
    Users,
    CalendarDays,
    Package,
    Pill,
    Syringe,
    BarChart3,
    Settings,
    Bell
} from 'lucide-react';

export default function Dashboard({
    residents = [],
    totalResidents = 0,
    pendingImmunizations = 0,
    dispensedMedicines = [],
    alerts = [],
    lowStockBatches = [], 
    expiringBatches = []
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [showNotifications, setShowNotifications] = useState(false);
    const [search, setSearch] = useState('');

    const filteredResidents = residents.filter((resident) =>
        resident.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-[#f5f7fb]">
                
                {/* MAIN CONTENT AREA */}
                <div className="flex-1 px-8 py-8">
                    
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2 text-gray-900">
                            Welcome {user.name}
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Role: {user.role}
                        </p>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
                        >
                            Log Out
                        </Link>
                    </div>

                    {/* ACTIVE STOCK ALERTS WORKSPACE */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Low Stock Alerts */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Package size={20} className="text-amber-500" /> {/* Now 'Package' is used! */}
                                ⚠️ Low Stock Monitor
                            </h2>
                            {lowStockBatches.length === 0 ? (
                                <p className="text-green-600 font-medium text-[14px] bg-green-50 p-3 rounded-xl border border-green-100">
                                    ✓ All medication quantities normal.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {lowStockBatches.map((batch) => (
                                        <div key={batch.id} className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-amber-900 text-[14px]">Batch: {batch.batch_number}</p>
                                                <p className="text-xs text-amber-700">Medicine ID: {batch.medicine_id}</p>
                                            </div>
                                            <span className="bg-amber-200 text-amber-900 font-black px-3 py-1 rounded-lg text-xs">
                                                {batch.quantity_remaining} Left
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Expiring Soon Alerts */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CalendarDays size={20} className="text-red-500" /> {/* Now 'CalendarDays' is used! */}
                                ⏳ Near-Expiry Track
                            </h2>
                            {expiringBatches.length === 0 ? (
                                <p className="text-green-600 font-medium text-[14px] bg-green-50 p-3 rounded-xl border border-green-100">
                                    ✓ No near-expiry items detected on shelves.
                                </p>
                            ) : (
                                <div className="space-y-3">
                                    {expiringBatches.map((batch) => (
                                        <div key={batch.id} className="p-3 bg-red-50 border border-red-200 rounded-xl flex justify-between items-center">
                                            <div>
                                                <p className="font-bold text-red-900 text-[14px]">Batch: {batch.batch_number}</p>
                                                <p className="text-xs text-red-700">Expires: {new Date(batch.expiration_date).toLocaleDateString()}</p>
                                            </div>
                                            <span className="bg-red-200 text-red-900 font-black px-2 py-1 rounded-lg text-xs">
                                                Action Required
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}