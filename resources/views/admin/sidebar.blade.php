<div class="bg-dark text-white p-3 vh-100" style="width:250px; position:fixed;">

    <h3 class="mb-4">MedServe</h3>

    <ul class="nav flex-column">

        <li class="nav-item mb-2">
    <a href="/admin/dashboard" class="nav-link text-white">
        Dashboard
    </a>
</li>

<a href="/residents" class="nav-link text-white">
    Residents
</a>

<li class="nav-item mb-2">
    <a href="{{ route('checkups.index') }}" class="nav-link text-white">
        Checkups
    </a>
</li>

        <li class="nav-item mb-2">
            <a href="#" class="nav-link text-white">Immunization</a>
        </li>

        <li class="nav-item mb-2">
           <a href="/inventory" class="sidebar-link">
    <i class="fa-solid fa-pills"></i>
    <span>Medicine Inventory</span>
</a>
        </li>

        <a href="/medicine-batches-page" class="sidebar-link">
    <i class="fa-solid fa-boxes-stacked"></i>
    <span>Batch Tracking</span>
</a>
        </li>

<a href="/medicine-dispensing" class="sidebar-link">
    <i class="fa-solid fa-hand-holding-medical"></i>
    <span>Medicine Dispensing</span>
</a>

        <li class="nav-item mb-2">
            <a href="#" class="nav-link text-white">Staff Management</a>
        </li>

        <a href="{{ route('reports.index') }}" class="nav-link">
            Reports
        </a>

        <li class="nav-item mb-2">
            <a href="#" class="nav-link text-white">Audit Logs</a>
        </li>

        <li class="nav-item mb-2">
            <a href="#" class="nav-link text-white">Settings</a>
        </li>

    </ul>

</div>