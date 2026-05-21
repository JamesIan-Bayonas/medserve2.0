<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>MedServe Dashboard</title>

    <!-- Bootstrap -->

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- Font Awesome -->

    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet">

    <style>
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}


html,
body{
    margin:0 !important;
    padding:0 !important;
    width:100%;
    min-height:100vh;
    overflow-x:hidden;
}

.main-content{
    width:calc(100% - 260px) !important;
    min-height:100vh;
}
body{
    background:#eef2f7;
    font-family:'Segoe UI', sans-serif;
    overflow-x:hidden;
    font-size:11px;
}

/* SIDEBAR */

.sidebar{
    width:260px;
    height:100vh;
    background:white;
    position:fixed;
    left:0;
    top:0;
    padding:20px;
    border-right:1px solid #e5e7eb;

    display:flex;
    flex-direction:column;
    justify-content:space-between;

    overflow-y:auto;
}

.sidebar::-webkit-scrollbar{
    width:4px;
}

.sidebar::-webkit-scrollbar-thumb{
    background:#cbd5e1;
    border-radius:10px;
}

.logo{
    font-size:32px;
    font-weight:700;
    color:#1e3a5f;
    margin-bottom:25px;
}

.menu a{
    display:flex;
    align-items:center;
    gap:12px;
    text-decoration:none;
    color:#64748b;
    padding:13px 16px;
    border-radius:14px;
    margin-bottom:10px;
    transition:0.3s;
    font-weight:600;
    font-size:11px;
}

.menu a:hover{
   background:#e2e8f0;
color:#1e3a5f;
}

.menu .active{
   background:#1e3a5f;
    color:white;
    box-shadow:0 4px 12px rgba(37,99,235,0.25);
}

/* MAIN CONTENT */

.main-content{
    margin-left:260px;
    padding:25px;
    width:calc(100% - 260px);
    box-sizing:border-box;
}

/* TOP SECTION */

.top-section{
    display:flex;
    justify-content:space-between;
    align-items:flex-start;
    margin-bottom:25px;
    gap:20px;
}

.page-title{
    flex:1;
}

.page-title h1{
    font-size:28px;
    font-weight:700;
    color:#0f172a;
    margin-bottom:6px;
}

.page-title p{
    color:#64748b;
    font-size:11px;
}

/* SEARCH + NOTIFICATION */

.top-right{
    display:flex;
    align-items:center;
    gap:18px;
}

.search-container{
    position:relative;
    z-index:99999;
}

.search-input{
    width:300px;
    height:48px;
    border:none;
    outline:none;
    padding:0 20px;
    border-radius:14px;
    background:white;
    font-size:14px;
    box-shadow:0 2px 8px rgba(0,0,0,0.04);
}

.search-dropdown{
    position:absolute;
    top:58px;
    left:0;
    width:100%;
    background:white;
    border-radius:14px;
    overflow:hidden;
    box-shadow:0 8px 24px rgba(0,0,0,0.08);
    display:none;
    z-index:1000;
    pointer-events:auto;
z-index:99999;
}

.search-item{
    padding:14px 18px;
    cursor:pointer;
    transition:0.2s;
    font-size:14px;
}

.search-item:hover{
    background:#eef2f7;
}


.notif-btn{
    width:50px;
    height:50px;
    border-radius:14px;
    background:white;
    display:flex;
    justify-content:center;
    align-items:center;
    position:relative;
    cursor:pointer;
    box-shadow:0 4px 12px rgba(0,0,0,0.05);
}

.notif-dot{
    width:9px;
    height:9px;
    border-radius:50%;
    background:red;
    position:absolute;
    top:10px;
    right:12px;
}

.notification-box{
    position:absolute;
    top:65px;
    right:0;
    width:280px;
    background:white;
    border-radius:16px;
    padding:16px;
    box-shadow:0 6px 20px rgba(0,0,0,0.08);
    display:none;
    z-index:999;
}

.notification-item{
    padding:12px;
    border-radius:12px;
    margin-bottom:10px;
    font-size:11px;
}

.notif-orange{
    background:#fff7ed;
}

.notif-red{
    background:#fef2f2;
}

.notif-blue{
    background:#eff6ff;
}

/* QUICK ACTIONS */

.quick-actions{
    display:grid;
    grid-template-columns:repeat(4,1fr);
    gap:18px;
    margin-bottom:22px;
}

.action-btn{
    border:none;
    border-radius:16px;
    padding:16px;
    color:white;
    font-size:11px;
    font-weight:600;
    display:flex;
    justify-content:center;
    align-items:center;
    gap:10px;
}

.btn-blue{
    background:#1e3a5f;
}

.btn-green{
    background:#5b8c74;
}

.btn-yellow{
    background:#c59b42;
}

.btn-cyan{
    background:#4f8c8d;
}

/* DASHBOARD CARDS */

.dashboard-cards{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:22px;
    margin-bottom:25px;
}

.dashboard-card{
    border:1px solid #e2e8f0;
    border-radius:20px;
    padding:22px;
    min-height:auto;
    box-shadow:0 4px 15px rgba(0,0,0,0.04);
    width:100%;
    position:relative;
z-index:1;
}

.card-icon{
    width:35px;
    height:35px;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:18px;
    margin-bottom:10px;
}

.blue{
    background:#dbe7f2;
    color:#1e3a5f;
}
.green{
    background:#dfeee5;
    color:#5b8c74;
}

.orange{
    background:#f8ead1;
    color:#c59b42;
}

.red{
    background:#f3dddd;
    color:#b85c5c;
}

.purple{
    background:#ece7f5;
    color:#6d5b98;
}

.card-title{
    font-size:11px;
    color:#64748b;
    margin-bottom:10px;
}

.card-value{
    font-size:32px;
    font-weight:700;
    color:#0f172a;
}

/* ADMIN PROFILE */

.admin-profile{
    background:#f8fafc;
    border-radius:16px;
    padding:14px;
    display:flex;
    align-items:center;
    gap:12px;
    margin-top:20px;
}

.admin-avatar{
    width:52px;
    height:52px;
    border-radius:50%;
   background:#1e3a5f;
    color:white;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size:20px;
    font-weight:700;
}

.logout-btn{
    width:100%;
    margin-top:14px;
    border:none;
    background:#1e3a5f;
    color:white;
    padding:14px;
    border-radius:14px;
    font-size:11px;
    font-weight:600;
}

/* ===== LOWER SECTION ===== */

.bottom-grid{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:22px;
    margin-top:25px;
    width:100%;
    align-items:start;
}

/* ALERTS FULL WIDTH */
.bottom-grid .dashboard-card:first-child{
    grid-column:1 / -1;
}

.bottom-grid .dashboard-card{
  background:#f4f7fb;
    border-radius:20px;
    padding:22px;
    width:100%;
    min-width:0;
    box-shadow:0 4px 15px rgba(0,0,0,0.04);
    border:1px solid rgba(255,255,255,0.5);
backdrop-filter:blur(6px);
}

/* SECTION TITLE */

.section-title{
    font-size:20px;
    font-weight:700;
    color:#0f172a;
    margin-bottom:18px;
}

/* RECENT + UPCOMING */

.activity-list{
    list-style:none;
    padding:0;
    margin:0;
}

.activity-list li{
    padding:16px;
    border:1px solid #e5e7eb;
    border-bottom:none;
    background:#fff;
    font-size:13px;
    color:#334155;
    transition:0.2s;
}

.activity-list li:hover{
    background:#f8fafc;
}

.activity-list li:first-child{
    border-radius:12px 12px 0 0;
}

.activity-list li:last-child{
    border-bottom:1px solid #e5e7eb;
    border-radius:0 0 12px 12px;
}

/* ALERTS */

.alert-box{
    padding:18px;
    border-radius:16px;
    font-size:13px;
    font-weight:500;
    margin-bottom:14px;
    line-height:1.5;
}

.alert-yellow{
    background:#FEF3C7;
    color:#92400E;
}

.alert-red{
    background:#FEE2E2;
    color:#991B1B;
}

.alert-blue{
    background:#DBEAFE;
    color:#1E40AF;
}

/* RESPONSIVE */

@media (max-width:1200px){

    .quick-actions{
        grid-template-columns:repeat(2,1fr);
    }

    .bottom-grid{
        grid-template-columns:1fr;
    }

}

@media (max-width:768px){

    .main-content{
        margin-left:0;
        width:100%;
        padding:15px;
    }

    .quick-actions{
        grid-template-columns:1fr;
    }

}
    </style>

</head>

<body style="margin:0; padding:0; width:100vw; overflow-x:hidden;">

    <!-- SIDEBAR -->

<div class="sidebar">

    <div>

        <div class="logo">
            MedServe
        </div>

        <div class="menu">

            <a href="#" class="active">
                <i class="fa fa-chart-line"></i>
                Dashboard
            </a>

            <a href="#">
                <i class="fa fa-users"></i>
                Residents
            </a>

            <a href="#">
                <i class="fa fa-notes-medical"></i>
                Checkups
            </a>

            <a href="#">
                <i class="fa fa-syringe"></i>
                Immunization
            </a>

            <a href="#">
                <i class="fa fa-capsules"></i>
                Medicine Inventory
            </a>

            <a href="#">
                <i class="fa fa-boxes-stacked"></i>
                Batch Tracking
            </a>

            <a href="#">
                <i class="fa fa-hand-holding-medical"></i>
                Medicine Dispensing
            </a>

        </div>

    </div>

    <!-- ADMIN PROFILE -->

    <div>

        <div class="admin-profile">

            <div class="admin-avatar">
                A
            </div>

            <div>
                <div style="font-weight:700;font-size:11px;">
                    Staff
                </div>

                <div style="font-size:11px;color:#64748b;">
                   Barangay Health Worker
                </div>
            </div>

        </div>

       <form method="POST" action="{{ route('logout') }}">

    @csrf

    <button type="submit" class="logout-btn">

        <i class="fa fa-right-from-bracket"></i>

        Logout

    </button>

</form>

    </div>

</div>


   <!-- MAIN CONTENT -->

<div class="main-content">

    <!-- TOP RIGHT -->
<div class="top-section">

    <div class="page-title">
        <h1>Staff Dashboard</h1>
        <p>Barangay Health Center Management System</p>
    </div>

    <div class="top-right">

       <div class="top-right">

    <div class="search-container">

        <input
            type="text"
            id="searchInput"
            class="search-input"
            placeholder="Search..."
            autocomplete="off"
        >

        <div id="searchDropdown" class="search-dropdown"></div>

    </div>

</div>

        <div class="notif-btn"
             onclick="toggleNotifications()">

            <i class="fa fa-bell"
               style="color:#1e3a5f;font-size:20px;"></i>

            <div class="notif-dot"></div>
        </div>

        <div class="notification-box"
             id="notificationBox">

            <h5 style="margin-bottom:15px;font-weight:700;">
                Notifications
            </h5>

            <div class="notification-item notif-orange">
                {{ $lowStockCount }} low stock medicines detected.
            </div>


            <div class="notification-item notif-blue">
                {{ $immunizationSchedules }} immunization schedules today.
            </div>

        </div>

    </div>

</div>
    


        <!-- QUICK ACTIONS -->
<div class="quick-actions">

    <button class="action-btn btn-blue">
        <i class="fa fa-user-plus"></i>
        Add Resident
    </button>

    <button class="action-btn btn-green">
        <i class="fa fa-pills"></i>
        Add Medicine
    </button>

    <button class="action-btn btn-yellow">
        <i class="fa fa-notes-medical"></i>
        Record Checkup
    </button>

    <button class="action-btn btn-cyan">
        <i class="fa fa-syringe"></i>
        Add Immunization
    </button>

</div>

        <!-- CARDS -->

        <div class="row g-4">

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon blue">
                        <i class="fa fa-users"></i>
                    </div>

                    <div class="card-value">
                        {{ $totalResidents }}
                    </div>

                </div>

            </div>


            <div class="col-md-4">

    <div class="dashboard-card">

        <div class="card-icon green">
            <i class="fa fa-notes-medical"></i>
        </div>

        <div class="card-title">
            Today's Checkups
        </div>

        <div class="card-value">
            {{ $todayCheckups }}
        </div>

    </div>

</div>

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon purple">
                        <i class="fa fa-capsules"></i>
                    </div>

                    <div class="card-title">
                        Medicine Availability
                    </div>

                    <div class="card-value">
                        {{ $totalMedicines }}
                    </div>

                </div>

            </div>

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon orange">
                        <i class="fa fa-triangle-exclamation"></i>
                    </div>

                    <div class="card-title">
                        Low Stock Alerts
                    </div>

                    <div class="card-value">
                        {{ $lowStockCount }}
                    </div>

                </div>

            </div>


            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon blue">
                        <i class="fa fa-syringe"></i>
                    </div>

                    <div class="card-title">
                        Immunization Schedule
                    </div>

                    <div class="card-value">
                        {{ $immunizationSchedules }}
                    </div>

                </div>

            </div>


  

   <!-- LOWER DASHBOARD SECTION -->
<div class="bottom-grid">

    <!-- ALERTS -->
    <div class="dashboard-card">

        <h3 class="section-title">
            Staff Alerts
        </h3>

        <div class="alert-box alert-yellow">
            Low stock medicines detected.
        </div>

        <div class="alert-box alert-red">
            Checkup schedules pending.
        </div>

        <div class="alert-box alert-blue">
            Immunization schedules pending.
        </div>

    </div>

    <!-- UPCOMING -->
    <div class="dashboard-card">

        <h3 class="section-title">
            Upcoming Schedules
        </h3>

        <ul class="activity-list">

    <li>Resident checkup recorded.</li>

    <li>Immunization updated.</li>

    <li>Medicine inventory updated.</li>

</ul>

    </div>

    <!-- RECENT -->
    <div class="dashboard-card">

        <h3 class="section-title">
            Recent Activities
        </h3>

        <ul class="activity-list">

            <li>Staff added new medicine.</li>

            <li>Resident checkup recorded.</li>

            <li>Immunization updated.</li>

        </ul>

    </div>

</div>

<script>

const searchItems = [

    {
        name: "Dashboard",
        link: "/staff/dashboard"
    },

    {
        name: "Residents",
        link: "/residents"
    },

    {
        name: "Checkups",
        link: "/checkups"
    },

    {
        name: "Immunization",
        link: "/immunization"
    },

    {
        name: "Medicine Inventory",
        link: "/medicines"
    },

    {
        name: "Batch Tracking",
        link: "/batch-tracking"
    },

    {
        name: "Medicine Dispensing",
        link: "/medicine-dispensing"
    }

];

const searchInput = document.getElementById('searchInput');

const searchDropdown =
    document.getElementById('searchDropdown');

searchInput.addEventListener('keyup', function () {

    const value = this.value.toLowerCase();

    searchDropdown.innerHTML = '';

    if (value === '') {

        searchDropdown.style.display = 'none';

        return;
    }

    const filtered = searchItems.filter(item =>
        item.name.toLowerCase().includes(value)
    );

    filtered.forEach(item => {

        const div = document.createElement('div');

        div.classList.add('search-item');

        div.innerText = item.name;

        div.addEventListener('click', () => {

            window.location.href = item.link;

        });

        searchDropdown.appendChild(div);

    });

    searchDropdown.style.display =
        filtered.length ? 'block' : 'none';

});

</script>


</body>
</html>