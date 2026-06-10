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
    
    // Diagnostics loop for telemetry validation
    console.log("Low Stock Array:", lowStockBatches);
    console.log("Expiring Array:", expiringBatches);

    // HEAD defensive fallback logic + main's safe navigation parameter check
    const filteredResidents = residents?.filter((resident) =>
        resident.name?.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-[#f5f7fb]">

                {/* SIDEBAR NAVIGATION WORKSPACE */}
                <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between">
                    <div>
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">MedServe</h1>
                            <p className="text-gray-500 text-sm mb-8">Clinical Management</p>
                        </div>

                        <nav className="px-4 space-y-6">
                            {/* Dashboard */}
                            <div>
                                <a 
                                    href="/dashboard" 
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
                                >
                                    <LayoutDashboard size={18} />
                                    Dashboard
                                </a>
                            </div>

                            {/* Residents Management */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                                    Residents
                                </p>
                                <Link
                                    href="/residents"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <Users size={18} /> Residents List
                                </Link>

                                {/* Checkups Management */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                                    Checkups
                                </p>

                                <Link
                                    href="/checkups"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <CalendarDays size={18} />
                                    Checkup Records
                                </Link>
                            </div>
                              <Link
                                    href="/checkups"
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    <CalendarDays size={18} />
                                    Checkup Records
                                </Link>
                            </div>

                            {/* Medicine Management */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                                    Medicine Management
                                </p>
                                <a 
                                    href="/medicine-batches-page" 
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <Package size={18} /> Inventory
                                </a>
                                <a 
                                    href="/medicine-dispensing" 
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <Pill size={18} /> Dispensation
                                </a>
                            </div>

                            {/* Utility Configuration */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                                    Settings
                                </p>
                                <a 
                                    href="/settings" 
                                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <Settings size={18} /> System Settings
                                </a>
                            </div>
                        </nav>
                    </div>

                    {/* Admin Access Panel Guard (Bottom Sidebar Anchor) */}
                    {user.role === 'admin' && (
                        <div className="p-4 m-4 bg-blue-100 border border-blue-200 rounded-xl shadow-sm">
                            <h2 className="font-bold text-xl mb-1 text-blue-900">
                                Admin Panel
                            </h2>
                            <p className="mb-4 text-xs text-blue-800">
                                Only admins can create staff accounts.
                            </p>
                        </div>
                    )}
                </div>

                {/* MAIN RUNTIME CONTENT VIEWPORT */}
                <div className="flex-1 px-8 py-8">
                    
                    {/* SYSTEM HEADER CONTROL BAR */}
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome, {user.name}</h1>
                            <p className="text-gray-600">Role: <span className="font-semibold capitalize text-blue-600">{user.role}</span></p>
                        </div>
                        
                        {/* Admin Action Control Hub (Top-Right Layout Alignment) */}
                        {user.role === 'admin' && (
                            <div className="flex gap-4 items-center">
                                <Link
                                    href={route('admin.create-staff')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium shadow-xs"
                                >
                                    + Add Staff
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition text-sm font-medium border border-red-200 shadow-2xs"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* TWO-COLUMN QUANTITY AND METRIC WIDGET GRID */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* LOW QUANTITY TRACKING COMPONENT */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Package size={20} className="text-amber-500" />
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
                                                <p className="text-xs text-amber-700">Medicine ID Reference: {batch.medicine_id}</p>
                                            </div>
                                            <span className="bg-amber-200 text-amber-900 font-black px-3 py-1 rounded-lg text-xs">
                                                {batch.quantity_remaining} Left
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* NEAR EXPIRATION ALIGNMENT PANEL */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <CalendarDays size={20} className="text-red-500" />
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