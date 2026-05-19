<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Medicine Inventory - MedServe</title>

    <script src="https://cdn.tailwindcss.com"></script>

    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>

<body class="bg-gray-100">

<div class="min-h-screen">

    <!-- HEADER -->
    <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between">

            <div class="flex items-center gap-3">
                <div class="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                    M
                </div>

                <div>
                    <h1 class="text-3xl font-bold">MedServe</h1>
                    <p class="text-gray-500 text-sm">Barangay Nangca</p>
                </div>
            </div>

            <h2 class="text-5xl font-semibold">
                Medicine Inventory
            </h2>

        </div>
    </div>

    <!-- CONTENT -->
    <div class="max-w-7xl mx-auto px-8 py-10">

        <!-- TOP -->
        <div class="flex justify-between items-center mb-10">

            <h2 class="text-5xl font-bold">
                All Medicines
            </h2>

            <button
                onclick="showAddModal()"
                class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-3xl flex items-center gap-3 text-xl"
            >
                <i class="fa-solid fa-plus"></i>
                Add New Medicine
            </button>

        </div>

        <!-- SEARCH -->
        <input
            type="text"
            id="searchInput"
            placeholder="Search medicine name or code..."
            onkeyup="filterTable()"
            class="w-full max-w-2xl mb-10 border border-gray-300 rounded-3xl px-6 py-5 text-xl outline-none focus:border-blue-500"
        >

        <!-- TABLE -->
        <div class="bg-white rounded-3xl shadow overflow-hidden">

            <table class="w-full">

                <thead class="bg-gray-100">
                    <tr>

                        <th class="px-8 py-6 text-left text-xl">
                            Code
                        </th>

                        <th class="px-8 py-6 text-left text-xl">
                            Medicine Name
                        </th>

                        <th class="px-8 py-6 text-left text-xl">
                            Category
                        </th>

                        <th class="px-8 py-6 text-left text-xl">
                            Unit
                        </th>

                        <th class="px-8 py-6 text-center text-xl">
                            Stock
                        </th>

                        <th class="px-8 py-6 text-center text-xl">
                            Action
                        </th>

                    </tr>
                </thead>

                <tbody id="tableBody" class="divide-y">
                </tbody>

            </table>

        </div>

    </div>

</div>

<!-- ADD MODAL -->
<div id="addMedicineModal"
     class="fixed inset-0 bg-black/40 hidden items-center justify-center z-50">

    <div class="bg-white w-full max-w-md rounded-3xl p-7 shadow-2xl">

        <h2 class="text-4xl font-bold mb-8">
            Add New Medicine
        </h2>

        <div class="space-y-4">

            <input
                type="text"
                id="med_code"
                placeholder="Code (MED-001)"
                class="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            >

            <input
                type="text"
                id="med_name"
                placeholder="Medicine Name"
                class="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            >

            <div class="grid grid-cols-2 gap-3">

                <input
                    type="text"
                    id="med_category"
                    placeholder="Category"
                    class="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                >

                <input
                    type="text"
                    id="med_unit"
                    placeholder="Unit"
                    class="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
                >

            </div>

            <input
                type="number"
                id="med_stock"
                placeholder="Initial Stock"
                class="w-full border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500"
            >
        </div>

        <div class="grid grid-cols-2 gap-3 mt-7">

            <button
                onclick="closeAddModal()"
                class="border border-gray-200 py-4 rounded-2xl font-medium hover:bg-gray-50"
            >
                Cancel
            </button>

            <button
                onclick="saveMedicine()"
                class="bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-medium"
            >
                Save
            </button>

        </div>

    </div>

</div>

<script>

async function loadMedicines() {

    try {

        const res = await fetch('/api/medicines');
        const result = await res.json();

        let html = '';

        if (result.data && result.data.length > 0) {

            result.data.forEach(med => {

                html += `
                    <tr>

                        <td class="px-8 py-6 text-lg">
                            ${med.code || '-'}
                        </td>

                        <td class="px-8 py-6 text-lg font-medium">
                            ${med.name}
                        </td>

                        <td class="px-8 py-6 text-lg">
                            ${med.category || '-'}
                        </td>

                        <td class="px-8 py-6 text-lg">
                            ${med.unit || '-'}
                        </td>

                        <td class="px-8 py-6 text-center text-lg font-bold">
                            ${med.current_stock}
                        </td>

                        <td class="px-8 py-6 text-center">

                            <button
                                onclick="adjustStock(${med.id}, ${med.current_stock})"
                                class="text-blue-600 hover:underline text-lg"
                            >
                                Adjust
                            </button>

                        </td>

                    </tr>
                `;
            });

        } else {

            html = `
                <tr>
                    <td colspan="6"
                        class="text-center py-20 text-gray-500 text-xl">
                        No medicines found.
                    </td>
                </tr>
            `;
        }

        document.getElementById('tableBody').innerHTML = html;

    } catch (e) {
        console.error(e);
    }
}

function showAddModal() {

    document
        .getElementById('addMedicineModal')
        .classList.remove('hidden');

    document
        .getElementById('addMedicineModal')
        .classList.add('flex');
}

function closeAddModal() {

    document
        .getElementById('addMedicineModal')
        .classList.add('hidden');

    document
        .getElementById('addMedicineModal')
        .classList.remove('flex');
}

async function saveMedicine() {

    const code = document.getElementById('med_code').value;
    const name = document.getElementById('med_name').value;
    const category = document.getElementById('med_category').value;
    const unit = document.getElementById('med_unit').value;
    const stock = document.getElementById('med_stock').value;

    if (!name || !unit || !stock) {
        alert('Please fill required fields');
        return;
    }

    try {

        const res = await fetch('/api/medicines', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },

            body: JSON.stringify({
                code: code,
                name: name,
                category: category,
                unit: unit,
                current_stock: parseInt(stock)
            })
        });

        const result = await res.json();

        if (result.success) {

            alert(result.message);

            closeAddModal();

            loadMedicines();

            document.getElementById('med_code').value = '';
            document.getElementById('med_name').value = '';
            document.getElementById('med_category').value = '';
            document.getElementById('med_unit').value = '';
            document.getElementById('med_stock').value = '';

        } else {

            alert('Failed to save medicine');
        }

    } catch (err) {

        console.error(err);

        alert('Something went wrong');
    }
}

async function adjustStock(id, currentStock) {

    const action = prompt(
        "Type:\n+10 to ADD stock\n-5 to REMOVE stock"
    );

    if (!action) return;

    const qty = parseInt(action);

    if (isNaN(qty) || qty === 0) {
        alert("Invalid quantity");
        return;
    }

    if ((currentStock + qty) < 0) {
        alert("Stock cannot go below zero");
        return;
    }

    try {

        const res = await fetch(
            `/api/medicines/${id}/adjust-stock`,
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify({
                    quantity: qty
                })
            }
        );

        const result = await res.json();

        if (result.success) {

            alert(result.message);

            loadMedicines();

        } else {

            alert(result.message || 'Adjustment failed');
        }

    } catch (err) {

        console.error(err);

        alert("Error adjusting stock");
    }
}

function filterTable() {

    const term = document
        .getElementById('searchInput')
        .value
        .toLowerCase();

    document
        .querySelectorAll('#tableBody tr')
        .forEach(row => {

            row.style.display = row.textContent
                .toLowerCase()
                .includes(term)
                ? ''
                : 'none';
        });
}

window.onload = loadMedicines;

</script>

</body>
</html>