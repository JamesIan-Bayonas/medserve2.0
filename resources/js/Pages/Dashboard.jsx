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
    
    // Added safety fallback in case residents is undefined
    const filteredResidents = residents?.filter((resident) =>
        resident.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            <div className="flex min-h-screen bg-[#f5f7fb]">

                {/* ======================================= */}
                {/* SIDEBAR                                 */}
                {/* ======================================= */}
                <div className="w-[250px] bg-white border-r border-gray-200 flex flex-col justify-between">
                    <div>
                        <div className="p-6">
                            <h1 className="text-3xl font-bold mb-2">MedServe</h1>
                            <p className="text-gray-500 text-sm mb-8">Clinical Management</p>
                        </div>

                        <nav className="px-4 space-y-6">
                            {/* Dashboard */}
                            <a href="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-semibold">
                                <LayoutDashboard size={18} />
                                Dashboard
                            </a>

                            {/* Residents */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">Residents</p>
                                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <Users size={18} /> Residents List
                                </a>
                                <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <CalendarDays size={18} /> Visit History
                                </a>
                            </div>

                            {/* Medicine */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">Medicine Management</p>
                                <a href="/medicine-batches-page" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <Package size={18} /> Inventory
                                </a>
                                <a href="/medicine-dispensing" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <Pill size={18} /> Dispensation
                                </a>
                            </div>

                            {/* Settings */}
                            <div>
                                <p className="text-[11px] uppercase tracking-[1px] text-gray-400 font-semibold mb-3 px-2">Settings</p>
                                <a href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-gray-700 hover:bg-gray-50 transition">
                                    <Settings size={18} /> System Settings
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>

                {/* ======================================= */}
                {/* MAIN CONTENT AREA                       */}
                {/* ======================================= */}
                <div className="flex-1 px-8 py-8">
                    
                    {/* Header */}
                    <div className="mb-8 flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome, {user.name}</h1>
                            <p className="text-gray-600">Role: <span className="font-semibold capitalize">{user.role}</span></p>
                        </div>
                        
                        {/* Admin Action Panel (Moved to top right for better UI flow) */}
                        {user.role === 'admin' && (
                            <div className="flex gap-4 items-center">
                                <Link
                                    href={route('admin.create-staff')}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                                >
                                    + Add Staff
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg transition text-sm font-medium border border-red-200"
                                >
                                    Log Out
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ======================================= */}
                    {/* ACTIVE STOCK ALERTS WORKSPACE           */}
                    {/* ======================================= */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Low Stock Alerts */}
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

                        {/* Expiring Soon Alerts */}
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