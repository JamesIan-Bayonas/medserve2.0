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
    padding:0 !important;color:#2563eb;
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
     background:#eef2f7;
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

.sidebar-menu a,
.logout-btn{
    transition:all 0.3s ease;
}

.sidebar-menu a:hover,
.logout-btn:hover{
    background:#1e3a5f;
    color:white;
    transform:translateX(5px);
    box-shadow:0 6px 15px rgba(30,58,95,0.2);
}

.sidebar-logo{
    display:flex;
    align-items:center;
    gap:14px;
    padding:20px;
    margin-bottom:25px;
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


.logo-icon{
    width:60px;
    height:60px;
    background:#1e3a5f;
    border-radius:18px;
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
    font-size:38px;
    font-weight:bold;
    flex-shrink:0;
}

.logo-text{
    display:flex;
    flex-direction:column;
    justify-content:center;
}


.logo-text h1{
    font-size:25px;
    font-weight:800;
    color:#1e3a5f;
    margin:0;
    line-height:1.1;
}


.logo-text p{
    margin-top:4px;
    font-size:10px;
    letter-spacing:1.5px;
    color:#1e3a5f;
    font-weight:700;
    white-space:nowrap;
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
    gap:14px;
    position:relative;
}

.search-box{
    position:relative;
}



.search-input{
    width:270px;
    padding:12px 16px;
    border:none;
    border-radius:14px;
    background:white;
    box-shadow:0 4px 12px rgba(0,0,0,0.05);
    outline:none;
    font-size:11px;
}

.search-dropdown{
    position:absolute;
    top:50px;
    left:0;
    width:100%;
    background:white;
    border-radius:12px;
    overflow:hidden;
    display:none;
    box-shadow:0 6px 18px rgba(0,0,0,0.08);
    z-index:999;
}

.search-item{
    display:block;
    padding:12px;
    color:black;
    text-decoration:none;
    border-radius:8px;
}

.search-item:hover{
    background:#f1f5f9;
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
     transition:all 0.3s ease;
}

.notification-btn:hover{
    transform:scale(1.08);
    background:#f1f5f9;
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
     transition:all 0.3s ease;
    cursor:pointer;
}

.action-btn:hover{
    transform:translateY(-3px);
    opacity:0.92;
    box-shadow:0 10px 20px rgba(0,0,0,0.12);
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
    background:#f8fafc;
      transition:all 0.3s ease;
    cursor:pointer;
}

.dashboard-card:hover{
    transform:translateY(-5px);
    box-shadow:0 12px 25px rgba(0,0,0,0.08);
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
    background:#ffffff;
    border-radius:20px;
    padding:22px;
    width:100%;
    min-width:0;
    box-shadow:0 4px 15px rgba(0,0,0,0.04);
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

.empty-state{
    padding:25px;
    text-align:center;
    color:#64748b;
    font-size:15px;
    border:1px dashed #cbd5e1;
    border-radius:12px;
    background:#f8fafc;
}

.sidebar-link{
    display:flex;
    align-items:center;
    gap:12px;
    padding:15px 18px;
    border-radius:14px;
    text-decoration:none;
    color:#1e3a5f;
    transition:0.3s;
}

.sidebar-link:hover{
    background:#1e3a5f;
    color:white;
}

.sidebar-link.active{
    background:#1e3a5f;
    color:white;
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

       <div class="sidebar-logo">

    <div class="logo-icon">
        <i class="fa-solid fa-plus"></i>
    </div>

    <div class="logo-text">
        <h1>MedServe</h1>
        <p>BARANGAY NANGCA</p>
    </div>

</div>

        <div class="menu">

            <a href="#" class="active">
                <i class="fa fa-chart-line"></i>
                Dashboard
            </a>

            <a href="/residents">
                <i class="fa fa-users"></i>
                Residents
            </a>

<a href="{{ route('checkups.index') }}">
    <i class="fa fa-notes-medical"></i>
    Checkups
</a>

            <a href="#">
                <i class="fa fa-syringe"></i>
                Immunization
            </a>

                        <a href="/inventory" class="sidebar-link">
                <i class="fa-solid fa-pills"></i>
                <span>Medicine Inventory</span>
            </a>
           <a href="/medicine-batches-page" class="sidebar-link">
    <i class="fa-solid fa-boxes-stacked"></i>
    <span>Batch Tracking</span>
</a>

           <a href="/medicine-dispensing">
    <i class="fa fa-hand-holding-medical"></i>
    Medicine Dispensing
    </a>

            <a href="#">
                <i class="fa fa-user-doctor"></i>
                Staff Management
            </a>

            <a href="#">
                <i class="fa fa-chart-pie"></i>
                Reports
            </a>

            <a href="#">
                <i class="fa fa-clock-rotate-left"></i>
                Audit Logs
            </a>

            <a href="#">
                <i class="fa fa-gear"></i>
                Settings
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
                    Admin
                </div>

                <div style="font-size:11px;color:#64748b;">
                    Barangay Captain
                </div>
            </div>

        </div>

        <form action="{{ route('logout') }}" method="POST">
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
        <h1>MedServe Administration</h1>
        <p>Barangay Health Center Management System</p>
    </div>

    <div class="top-right">

        <div class="search-box">
            <input type="text"
                   id="searchInput"
                   class="search-input"
                   placeholder="Search...">

            <div class="search-dropdown"
                 id="searchDropdown">
            </div>
        </div>

        <div class="notif-btn"
             onclick="toggleNotifications()">

            <i class="fa fa-bell"
               style="color:#2563eb;font-size:20px;"></i>

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

            <div class="notification-item notif-red">
                {{ $expiringMedicines }} medicines expiring soon.
            </div>

            <div class="notification-item notif-blue">
                {{ $immunizationSchedules }} immunization schedules today.
            </div>

        </div>

    </div>

</div>
    


        <!-- QUICK ACTIONS -->

<div class="quick-actions">

<a href="{{ route('residents.create') }}" class="action-btn btn-blue">
    <i class="fa fa-user-plus"></i>
    Add Resident
</a>
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

                    <div class="card-title">
                        Total Residents
                    </div>

                    <div class="card-value">
                        {{ $totalResidents }}
                    </div>

                </div>

            </div>

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon green">
                        <i class="fa fa-user-doctor"></i>
                    </div>

                    <div class="card-title">
                        Total Staff
                    </div>

                    <div class="card-value">
                        {{ $totalStaff }}
                    </div>

                </div>

            </div>

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon purple">
                        <i class="fa fa-capsules"></i>
                    </div>

                    <div class="card-title">
                        Total Medicines
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

                    <div class="card-icon red">
                        <i class="fa fa-calendar-xmark"></i>
                    </div>

                    <div class="card-title">
                        Expiring Medicines
                    </div>

                    <div class="card-value">
                        {{ $expiringMedicines }}
                    </div>

                </div>

            </div>

            <div class="col-md-4">

                <div class="dashboard-card">

                    <div class="card-icon blue">
                        <i class="fa fa-syringe"></i>
                    </div>

                    <div class="card-title">
                        Immunization Summary
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
            Critical Alerts
        </h3>

        <div class="alert-box alert-yellow">
            Low stock medicines detected.
        </div>

        <div class="alert-box alert-red">
            Medicines expiring soon.
        </div>

        <div class="alert-box alert-blue">
            Immunization schedules pending.
        </div>

    </div>
    <!-- RECENT DISPENSING RECORDS -->
<div class="dashboard-card" style="margin-top: 20px; grid-column: 1 / -1;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
        <h3 class="section-title" style="margin: 0;">Recent Dispensing Records</h3>
       <a href="/admin/reports" style="font-size: 14px; text-decoration: none; color: #0d6efd;">View All in Reports &rarr;</a>
    </div>

    <div style="overflow-x: auto;">
    <table style="width: 100%; border-collapse: collapse; text-align: left; color: #1e293b;">
        <thead style="background-color: #f8f9fa; border-bottom: 2px solid #dee2e6;">
            <tr>
                <th style="padding: 12px; font-weight: 600; color: #1e293b;">Patient Name</th>
                <th style="padding: 12px; font-weight: 600; color: #1e293b;">Medicine</th>
                <th style="padding: 12px; font-weight: 600; color: #1e293b;">Qty</th>
                <th style="padding: 12px; font-weight: 600; color: #1e293b;">Dosage</th>
                <th style="padding: 12px; font-weight: 600; color: #1e293b;">Date</th>
            </tr>
        </thead>
        <tbody>
            
            <!-- Sample Record 1 -->
            <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px; font-weight: bold; color: #1e293b;">Alyssa Faith S. Bagunbon</td>
                <td style="padding: 12px; color: #1e293b;">Paracetamol</td>
                <td style="padding: 12px; font-weight: bold; color: #1e293b;">10</td>
                <td style="padding: 12px; color: #1e293b;">1 tablet 3x a day</td>
                <td style="padding: 12px; color: #475569;">5/31/2026</td>
            </tr>

            <!-- Sample Record 2 -->
            <tr style="border-bottom: 1px solid #dee2e6;">
                <td style="padding: 12px; font-weight: bold; color: #1e293b;">Maria Pineda</td>
                <td style="padding: 12px; color: #1e293b;">Amoxicillin</td>
                <td style="padding: 12px; font-weight: bold; color: #1e293b;">21</td>
                <td style="padding: 12px; color: #1e293b;">1 capsule 3x a day for 7 days</td>
                <td style="padding: 12px; color: #475569;">5/31/2026</td>
            </tr>
        </tbody>
    </table>
</div>
            </tbody>
        </table>
    </div>
</div>
    <!-- UPCOMING -->
    <div class="dashboard-card">

        <h3 class="section-title">
            Upcoming Schedules
        </h3>

        <div class="empty-state">
    No upcoming schedules.
</div>
    </div>

    <!-- RECENT -->
    <div class="dashboard-card">

        <h3 class="section-title">
            Recent Activities
        </h3>

       <div class="empty-state">
    No recent activity.
</div>

    </div>

</div>

<script>

const searchData = [
    { name: "Dashboard", link: "/admin/dashboard" },
    { name: "Residents", link: "/residents" },
    { name: "Checkups", link: "/checkups" },
    { name: "Immunization", link: "/immunization" },
    { name: "Medicine Inventory", link: "/inventory" },
    { name: "Batch Tracking", link: "/batch-tracking" },
    { name: "Medicine Dispensing", link: "/medicine-dispensing" },
    { name: "Staff Management", link: "/staff-management" },
    { name: "Reports", link: "/reports" },
    { name: "Audit Logs", link: "/audit-logs" },
    { name: "Settings", link: "/settings" }
];

const searchInput = document.getElementById("searchInput");
const searchDropdown = document.getElementById("searchDropdown");

searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    searchDropdown.innerHTML = "";

    if (value === "") {
        searchDropdown.style.display = "none";
        return;
    }

    let filtered = searchData.filter(item =>
        item.name.toLowerCase().includes(value)
    );

    if (filtered.length > 0) {

        searchDropdown.style.display = "block";

        filtered.forEach(item => {

            searchDropdown.innerHTML += `
                <a href="${item.link}" class="search-item">
                    ${item.name}
                </a>
            `;

        });

    } else {

        searchDropdown.style.display = "none";

    }

});

</script>


</body>
</html>