<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicine Inventory - MedServe</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
</head>

<body class="bg-gray-50">

<div class="min-h-screen">

    <!-- HEADER -->
    <div class="bg-white border-b">
        <div class="max-w-[1400px] mx-auto px-8 py-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl">
                    +
                </div>
                <div>
                    <h1 class="text-2xl font-bold text-gray-800">MedServe</h1>
                    <p class="text-xs text-gray-500">BARANGAY NANGCA</p>
                </div>
            </div>
            
            <div class="flex items-center gap-8">
                <nav class="flex gap-6 text-sm font-medium">
                    <a href="#" class="text-blue-600 border-b-2 border-blue-600 pb-1">Medicine Inventory</a>
                    
                </nav>
                
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">👤</div>
                    <div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="max-w-[1400px] mx-auto px-8 py-8">

        <div class="mb-8">
            <h1 class="text-4xl font-bold text-gray-900">Medicine Inventory</h1>
            <p class="text-gray-600 mt-1">Manage medicine and monitor expiration dates.</p>
        </div>

        <!-- STATS -->
        <div class="grid grid-cols-3 gap-6 mb-8">
            <div class="bg-white rounded-3xl p-6 shadow flex items-center gap-4">
                <div class="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600">
                    <i data-lucide="packages" class="w-7 h-7"></i>
                </div>
                <div>
                    <p class="text-4xl font-bold text-gray-800" id="totalCount">0</p>
                    <p class="text-sm text-gray-500">Total Medicines</p>
                </div>
            </div>
            <div class="bg-white rounded-3xl p-6 shadow flex items-center gap-4">
                <div class="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center text-green-600">
                    <i data-lucide="shield-check" class="w-7 h-7"></i>
                </div>
                <div>
                    <p class="text-4xl font-bold text-gray-800" id="activeCount">0</p>
                    <p class="text-sm text-gray-500">Active</p>
                </div>
            </div>
            <div class="bg-white rounded-3xl p-6 shadow flex items-center gap-4">
                <div class="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500">
                    <i data-lucide="alert-triangle" class="w-7 h-7"></i>
                </div>
                <div>
                    <p class="text-4xl font-bold text-gray-800" id="expiredCount">0</p>
                    <p class="text-sm text-gray-500">Need Attention</p>
                </div>
            </div>
        </div>
        <!-- SEARCH + FILTER + ADD BUTTON -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4 flex-1">
                <div class="flex-1 relative">
                    <input type="text" id="searchInput" placeholder="Search medicine name or code..." 
                           onkeyup="loadMedicines()"
                           class="w-full border border-gray-300 rounded-3xl px-6 py-4 pl-12 focus:border-blue-500 outline-none text-lg">
                    <i data-lucide="search" class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                </div>
                <select id="categoryFilter" onchange="loadMedicines()" 
                        class="border border-gray-300 rounded-3xl px-6 py-4 focus:border-blue-500 outline-none text-lg">
                    <option value="">All Categories</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Analgesic">Analgesic</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Pediatric">Pediatric</option>
                </select>
            </div>

        <!-- SEARCH + FILTER + ADD BUTTON -->
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center gap-4 flex-1">
                <div class="flex-1 relative">
                    <input type="text" id="searchInput" placeholder="Search medicine name or code..." 
                           onkeyup="loadMedicines()"
                           class="w-full border border-gray-300 rounded-3xl px-6 py-4 pl-12 focus:border-blue-500 outline-none text-lg">
                    <i data-lucide="search" class="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5"></i>
                </div>
                <select id="categoryFilter" onchange="loadMedicines()" 
                        class="border border-gray-300 rounded-3xl px-6 py-4 focus:border-blue-500 outline-none text-lg">
                    <option value="">All Categories</option>
                    <option value="Cardiovascular">Cardiovascular</option>
                    <option value="Analgesic">Analgesic</option>
                    <option value="Antibiotic">Antibiotic</option>
                    <option value="Pediatric">Pediatric</option>
                </select>
            </div>

            <button onclick="showAddModal()" 
                    class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl flex items-center gap-3 text-lg shadow-lg ml-6 whitespace-nowrap">
                <i data-lucide="plus" class="w-6 h-6"></i>
                Add New Medicine
            </button>
        </div>

        <!-- TABLE with Unit Column -->
        <div class="bg-white rounded-3xl shadow overflow-hidden">
            <table class="w-full">
                <thead class="bg-gray-100">
                    <tr>
                        <th class="px-10 py-5 text-left">Code</th>
                        <th class="px-10 py-5 text-left">Medicine</th>
                        <th class="px-10 py-5 text-left">Category</th>
                        <th class="px-10 py-5 text-left">Unit</th>
                        <th class="px-10 py-5 text-center">Stock</th>
                        <th class="px-10 py-5 text-center">Expiration</th>
                        <th class="px-10 py-5 text-center w-40">Actions</th>
                    </tr>
                </thead>
                <tbody id="tableBody" class="divide-y"></tbody>
            </table>
        </div>
    </div>
</div>

<!-- ADD / EDIT MODAL -->
<div id="addMedicineModal" class="fixed inset-0 bg-black/60 hidden items-center justify-center z-50">
    <div class="bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl">
        <h2 class="text-3xl font-bold mb-6" id="modalTitle">Add New Medicine</h2>
        <input type="hidden" id="edit_id">
        
        <div class="space-y-5">
            <input type="text" id="med_name" placeholder="Medicine Name" class="w-full border border-gray-300 rounded-2xl px-5 py-4">
            <div class="grid grid-cols-2 gap-4">
                <input type="text" id="med_code" placeholder="Code (MED-001)" class="border border-gray-300 rounded-2xl px-5 py-4">
                <input type="text" id="med_category" placeholder="Category" class="border border-gray-300 rounded-2xl px-5 py-4">
            </div>
            <div class="grid grid-cols-2 gap-4">
                <input type="text" id="med_unit" placeholder="Unit (e.g. tablet, bottle)" class="border border-gray-300 rounded-2xl px-5 py-4">
                <input type="number" id="med_stock" placeholder="Stock Quantity" class="border border-gray-300 rounded-2xl px-5 py-4">
            </div>
            <input type="date" id="med_expiration" class="w-full border border-gray-300 rounded-2xl px-5 py-4">
        </div>

        <div class="flex gap-4 mt-8">
            <button onclick="closeModal()" class="flex-1 py-4 border border-gray-300 rounded-2xl font-medium">Cancel</button>
            <button onclick="saveMedicine()" id="saveButton" class="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-medium">Add Medicine</button>
        </div>
    </div>
</div>

<script>
// Initialize Lucide
lucide.createIcons();

let allMedicines = [];

async function loadMedicines() {
    try {
        const search = document.getElementById('searchInput').value;
        const category = document.getElementById('categoryFilter').value;

        const res = await fetch(`/api/medicines?search=${search}&category=${category}`);
        const result = await res.json();

        allMedicines = result.data || [];

        let html = '';
        let total = 0, active = 0, expired = 0;

        allMedicines.forEach(med => {
            const expDate = med.expiration_date ? med.expiration_date.split('T')[0] : '-';
            const isExpired = expDate !== '-' && new Date(expDate) < new Date();

            total++;
            if (isExpired) expired++;
            else active++;

            html += `
                <tr class="hover:bg-gray-50 transition-colors">
                    <td class="px-10 py-5">${med.code || '-'}</td>
                    <td class="px-10 py-5 font-semibold">${med.name}</td>
                    <td class="px-10 py-5">${med.category || '-'}</td>
                    <td class="px-10 py-5">${med.unit || '-'}</td>
                    <td class="px-10 py-5 text-center">
                        <span class="px-5 py-1.5 rounded-full text-sm font-bold ${med.current_stock <= 20 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-700'}">
                            ${med.current_stock}
                        </span>
                    </td>
                    <td class="px-10 py-5 text-center ${isExpired ? 'text-red-600 font-medium' : ''}">${expDate}</td>
                    <td class="px-10 py-5">
                        <div class="flex justify-center gap-6">
                            <button onclick="adjustStock(${med.id}, ${med.current_stock})" class="text-blue-600 hover:text-blue-700" title="Adjust Stock">
                                <i data-lucide="package" class="w-6 h-6"></i>
                            </button>
                            <button onclick='editMedicine(${JSON.stringify(med)})' class="text-amber-600 hover:text-amber-700" title="Edit">
                                <i data-lucide="edit" class="w-6 h-6"></i>
                            </button>
                            <button onclick="deleteMedicine(${med.id})" class="text-red-600 hover:text-red-700" title="Delete">
                                <i data-lucide="trash-2" class="w-6 h-6"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        if (allMedicines.length === 0) {
            html = `<tr><td colspan="7" class="text-center py-16 text-gray-500">No medicines found.</td></tr>`;
        }

        document.getElementById('tableBody').innerHTML = html;
        document.getElementById('totalCount').textContent = total;
        document.getElementById('activeCount').textContent = active;
        document.getElementById('expiredCount').textContent = expired;

        lucide.createIcons();
    } catch (err) {
        console.error(err);
    }
}

// ... (rest of the functions remain the same as previous version)

function showAddModal() {
    document.getElementById('edit_id').value = '';
    document.getElementById('modalTitle').textContent = 'Add New Medicine';
    document.getElementById('saveButton').textContent = 'Add Medicine';
    
    document.getElementById('med_name').value = '';
    document.getElementById('med_code').value = '';
    document.getElementById('med_category').value = '';
    document.getElementById('med_unit').value = '';
    document.getElementById('med_stock').value = '';
    document.getElementById('med_expiration').value = '';

    document.getElementById('addMedicineModal').classList.remove('hidden');
    document.getElementById('addMedicineModal').classList.add('flex');
}

function editMedicine(med) {
    document.getElementById('edit_id').value = med.id;
    document.getElementById('modalTitle').textContent = 'Edit Medicine';
    document.getElementById('saveButton').textContent = 'Save Changes';

    document.getElementById('med_name').value = med.name || '';
    document.getElementById('med_code').value = med.code || '';
    document.getElementById('med_category').value = med.category || '';
    document.getElementById('med_unit').value = med.unit || '';
    document.getElementById('med_stock').value = med.current_stock || '';
    document.getElementById('med_expiration').value = med.expiration_date ? med.expiration_date.split('T')[0] : '';

    document.getElementById('addMedicineModal').classList.remove('hidden');
    document.getElementById('addMedicineModal').classList.add('flex');
}

function closeModal() {
    document.getElementById('addMedicineModal').classList.add('hidden');
    document.getElementById('addMedicineModal').classList.remove('flex');
}

async function saveMedicine() {
    const id = document.getElementById('edit_id').value;
    const name = document.getElementById('med_name').value.trim();
    const code = document.getElementById('med_code').value.trim();
    const category = document.getElementById('med_category').value.trim();
    const unit = document.getElementById('med_unit').value.trim();
    const stock = parseInt(document.getElementById('med_stock').value);
    const expiration = document.getElementById('med_expiration').value;

    if (!name || !stock) return alert("Medicine name and stock quantity are required");
    if (!expiration) return alert("Expiration date is required");

    if (!id) {
        const existing = allMedicines.find(m => 
            m.name.toLowerCase() === name.toLowerCase() && 
            m.expiration_date && 
            m.expiration_date.split('T')[0] === expiration
        );

        if (existing) {
            await adjustStock(existing.id, existing.current_stock, stock);
            closeModal();
            return;
        }
    }

    const method = id ? 'PUT' : 'POST';
    const url = id ? `/api/medicines/${id}` : '/api/medicines';

    try {
        const res = await fetch(url, {
            method: method,
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({code, name, category, unit, current_stock: stock, expiration_date: expiration})
        });
        const result = await res.json();
        if (result.success) {
            alert(id ? 'Updated successfully' : 'Added successfully');
            closeModal();
            loadMedicines();
        }
    } catch (err) {
        alert('Operation failed');
    }
}

async function adjustStock(id, currentStock, addAmount = null) {
    let qty = addAmount;
    if (qty === null) {
        const action = prompt(`Current Stock: ${currentStock}\n\nEnter quantity (+ to add, - to deduct):`, "+10");
        if (action === null) return;
        qty = parseInt(action);
    }
    if (isNaN(qty) || qty === 0) return alert("Invalid quantity");

    try {
        const res = await fetch(`/api/medicines/${id}/adjust-stock`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({quantity: qty})
        });
        const result = await res.json();
        if (result.success) loadMedicines();
    } catch (err) {
        alert('Failed to adjust stock');
    }
}

async function deleteMedicine(id) {
    if (!confirm('Delete this medicine?')) return;
    try {
        const res = await fetch(`/api/medicines/${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) loadMedicines();
    } catch (err) {
        alert('Delete failed');
    }
}

window.onload = loadMedicines;
</script>
</body>
</html>