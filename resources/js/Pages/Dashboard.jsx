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

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

// REMOVED: interface MedicineBatch {...}
// REMOVED: interface DashboardProps {...}

export default function Dashboard({
    residents,
    totalResidents,
    pendingImmunizations,
    dispensedMedicines,
    alerts,
    lowStockBatches = [], // Catching incoming database arrays cleanly
    expiringBatches = []
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    const [showNotifications, setShowNotifications] = useState(false);
    const [search, setSearch] = useState('');

    // Quick test to ensure the pipeline works:
    console.log("Low Stock:", lowStockBatches);
    console.log("Expiring:", expiringBatches);

    const filteredResidents = residents.filter((resident) =>
        resident.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <AuthenticatedLayout>

<Head title="Dashboard" />

<div className="flex min-h-screen bg-[#f5f7fb]">

    {/* SIDEBAR */}
    <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between">

        <div>

            <div className="p-6">

                <h1 className="text-4xl font-bold mb-2">
                    Welcome {user.name}
                </h1>

                <p className="text-gray-600 text-lg mb-8">
                    Role: {user.role}
                </p>

            </div>

            <nav className="px-4">

                {/* Dashboard */}
                <a
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold"
                >
                    <LayoutDashboard size={18} />
                    Dashboard
                </a>

                {/* Residents */}
                <div className="mt-7">

                    <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                        Residents
                    </p>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Users size={18} />
                        Residents List
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <CalendarDays size={18} />
                        Visit History
                    </a>

                </div>

                {/* Medicine */}
                <div className="mt-7">

                    <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                        Medicine Management
                    </p>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Package size={18} />
                        Inventory
                    </a>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Pill size={18} />
                        Dispensation
                    </a>

                </div>

                {/* Immunization */}
                <div className="mt-7">

                    <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                        Immunization
                    </p>

                    <a
                        href="#"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Syringe size={18} />
                        Immunization Records
                    </a>

                </div>

                {/* Reports */}
                <div className="mt-7">

                    <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                        Reports
                    </p>

                    <a
                        href="/health-reports"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <BarChart3 size={18} />
                        Health Reports
                    </a>

                </div>

                {/* Settings */}
                <div className="mt-7">

                    <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">
                        Settings
                    </p>

                    <a
                        href="/settings"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition"
                    >
                        <Settings size={18} />
                        System Settings
                    </a>

                </div>

                {/* Admin Panel */}
                {user.role === 'admin' && (

                    <div className="bg-blue-100 border border-blue-200 p-6 rounded-xl mt-8 shadow-sm">

                        <h2 className="font-bold text-2xl mb-2 text-blue-900">
                            Admin Panel
                        </h2>

                        <p className="mb-5 text-blue-800">
                            Only admins can create staff accounts.
                        </p>

                        <Link
                            href="/admin/create-staff"
                            className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-lg inline-block"
                        >
                            Create Staff
                        </Link>

                    </div>

                )}

                {/* Staff Panel */}
                {user.role === 'staff' && (

                    <div className="bg-green-100 border border-green-200 p-6 rounded-xl mt-8 shadow-sm">

                        <h2 className="font-bold text-2xl mb-2 text-green-900">
                            Staff Panel
                        </h2>

                        <p className="text-green-800">
                            Welcome to the MedServe staff dashboard.
                        </p>

                    </div>

                )}

            </nav>

        </div>

        {/* Profile */}
        <div className="p-4">

            <div className="bg-gray-50 border border-gray-200 rounded-3xl p-6 text-center shadow-sm">

                <div className="relative w-fit mx-auto mb-4">

                    <img
                        src="https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=2563eb&color=fff"
                        alt="Profile"
                        className="w-12 h-12 rounded-full shadow-md"
                    />

                    <span className="absolute bottom-1 right-1 w-2 h-2 bg-green-500 border-2 border-white rounded-full"></span>

                </div>

                <p className="text-[11px] text-gray-500">
                    Logged in as
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-2">
                    {user.name}
                </h3>

                <p className="text-[11px] text-blue-600 font-medium mt-1">
                    Barangay Health Worker
                </p>

            </div>

            <Link
                href={route('logout')}
                method="post"
                as="button"
                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-2xl text-[15px] font-semibold transition"
            >
                Log Out
            </Link>

        </div>

    </div>

    {/* MAIN CONTENT */}
    <div className="flex-1 px-5 py-4">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">

            <div>

                <h1 className="text-[28px] font-bold text-gray-900">
                    Health Center Dashboard
                </h1>

                <p className="text-[13px] text-gray-500 mt-2">
                    Monitor residents records, medicine inventory, and recent health center activities.
                </p>

            </div>

            <div className="flex items-center gap-4">

                <div className="relative">

                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80 h-10 pl-14 pr-3 rounded-2xl border border-gray-200 bg-white shadow-sm text-[14px] focus:outline-none"
                    />

                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[15px] text-gray-400">
                        🔍
                    </span>

                </div>

                {/* Notifications */}
                <div className="relative">

                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative w-10 h-10 rounded-2xl bg-white shadow-sm flex items-center justify-center"
                    >

                        <Bell className="w-5 h-5 text-gray-600" />

                        {alerts.length > 0 && (

                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                                {alerts.length}
                            </span>

                        )}

                    </button>

                    {showNotifications && (

                        <div className="absolute right-0 mt-3 w-[320px] bg-white rounded-2xl shadow-xl border border-gray-100 z-50 p-4">

                            <h2 className="text-[15px] font-semibold mb-4">
                                Notifications
                            </h2>

                            <div className="space-y-3">

                                {alerts.map((alert, index) => (

                                    <div
                                        key={index}
                                        className="p-3 rounded-xl bg-gray-50 border border-gray-100"
                                    >

                                        <p className="text-[14px] font-medium text-gray-900">
                                            {alert.title}
                                        </p>

                                        <p className="text-[12px] text-gray-500 mt-1">
                                            {alert.message}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    )}

                </div>

            </div>

        </div>

    </div>

</div>

{/* ACTIVE STOCK ALERTS WORKSPACE */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Low Stock Alerts */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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

            {/* Expiring Soon Alerts */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
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

</AuthenticatedLayout>

);

}