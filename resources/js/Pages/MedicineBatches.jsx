import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Search,
    Filter,
    ShieldCheck,
    CalendarX2,
    UserCircle2,
    Plus,
    ClipboardList,
} from "lucide-react";

export default function MedicineBatchesPage() {

    // STATES
    const [batches, setBatches] = useState([]);
    const [filteredBatches, setFilteredBatches] = useState([]);
    const [search, setSearch] = useState("");
    const [filterExpired, setFilterExpired] = useState(false);
    const [editingId, setEditingId] = useState(null);

    // FORM
    const [form, setForm] = useState({
        medicine_id: "",
        batch_number: "",
        date_received: "",
        expiration_date: "",
        quantity_received: "",
    });

    // FETCH ON LOAD
    useEffect(() => {
        fetchBatches();
    }, []);

    // FETCH BATCHES
    const fetchBatches = async () => {

        try {

            const response = await axios.get("/batches");

            setBatches(response.data);
            setFilteredBatches(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to fetch batches");
        }
    };

    // ADD / UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // UPDATE
            if (editingId) {

                const response = await axios.put(
                    `/batches/${editingId}`,
                    {
                        ...form,
                        quantity_remaining:
                            form.quantity_received,
                    }
                );

                const updatedBatches = batches.map(
                    (batch) =>
                        batch.id === editingId
                            ? response.data.batch
                            : batch
                );

                setBatches(updatedBatches);
                setFilteredBatches(updatedBatches);

                alert("Batch updated successfully!");

                setEditingId(null);

            } else {

                // ADD
                const response = await axios.post(
                    "/batches",
                    {
                        ...form,
                        quantity_remaining:
                            form.quantity_received,
                    }
                );

                const updatedBatches = [
                    ...batches,
                    response.data.batch,
                ];

                setBatches(updatedBatches);
                setFilteredBatches(updatedBatches);

                alert("Medicine batch added successfully!");
            }

            // RESET FORM
            setForm({
                medicine_id: "",
                batch_number: "",
                date_received: "",
                expiration_date: "",
                quantity_received: "",
            });

        } catch (error) {

            console.error(error);

            if (error.response?.data?.errors) {

                const errors =
                    error.response.data.errors;

                const firstError =
                    Object.values(errors)[0][0];

                alert(firstError);

                return;
            }

            alert("Operation failed");
        }
    };

    // SEARCH
    const handleSearch = (e) => {

        const value = e.target.value;

        setSearch(value);

        const filtered = batches.filter((batch) =>
            batch.batch_number
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setFilteredBatches(filtered);
    };

    // FILTER EXPIRED
    const handleFilterExpired = () => {

        if (!filterExpired) {

            const today = new Date();

            today.setHours(0,0,0,0);

            const expired = batches.filter(
                (batch) => {

                    const expDate = new Date(
                        batch.expiration_date
                    );

                    expDate.setHours(0,0,0,0);

                    return expDate <= today;
                }
            );

            setFilteredBatches(expired);

        } else {

            setFilteredBatches(batches);
        }

        setFilterExpired(!filterExpired);
    };

    // COUNTS
    const today = new Date();

    today.setHours(0,0,0,0);

    const totalBatches = batches.length;

    const activeBatches = batches.filter(
        (batch) => {

            const expDate = new Date(
                batch.expiration_date
            );

            expDate.setHours(0,0,0,0);

            return expDate > today;
        }
    ).length;

    const expiredBatches = batches.filter(
        (batch) => {

            const expDate = new Date(
                batch.expiration_date
            );

            expDate.setHours(0,0,0,0);

            return expDate <= today;
        }
    ).length;

    return (

        <div
            style={{
                minHeight: "100vh",
                background: "#f3f6fb",
                fontFamily: "Inter, sans-serif",
            }}
        >

            {/* HEADER */}
            <div
                style={{
                    height: "72px",
                    background: "#fff",
                    borderBottom: "1px solid #e5e7eb",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "0 28px",
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >

                    <div
                        style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "14px",
                            background:
                                "linear-gradient(135deg,#2563eb,#1d4ed8)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Plus color="white" size={24} />
                    </div>

                    <div>

                        <h1
                            style={{
                                margin: 0,
                                fontSize: "18px",
                                fontWeight: "800",
                            }}
                        >
                            MedServe
                        </h1>

                        <p
                            style={{
                                margin: 0,
                                color: "#2563eb",
                                fontWeight: "700",
                                letterSpacing: "2px",
                                fontSize: "10px",
                            }}
                        >
                            BARANGAY NANGCA
                        </p>

                    </div>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "24px",
                    }}
                >

                    <span
                        style={{
                            color: "#64748b",
                        }}
                    >
                        Medicine Inventory
                    </span>

                    <span
                        style={{
                            color: "#2563eb",
                            fontWeight: "700",
                        }}
                    >
                        Batch Tracking
                    </span>

                    <div
                        style={{
                            width: "1px",
                            height: "28px",
                            background: "#e2e8f0",
                        }}
                    />

                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >

                        <UserCircle2
                            size={30}
                            color="#2563eb"
                        />

                        <div>

                            <div
                                style={{
                                    fontWeight: "700",
                                }}
                            >
                                Faith
                            </div>

                            <div
                                style={{
                                    fontSize: "12px",
                                    color: "#64748b",
                                }}
                            >
                                Staff
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div
                style={{
                    padding: "24px 28px",
                    maxWidth: "1500px",
                    margin: "0 auto",
                }}
            >

                {/* TOP */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "24px",
                    }}
                >

                    <div>

                        <h1
                            style={{
                                fontSize: "40px",
                                margin: 0,
                                fontWeight: "900",
                                color: "#0f172a",
                            }}
                        >
                            Medicine Batch Tracking
                        </h1>

                        <p
                            style={{
                                color: "#64748b",
                                marginTop: "12px",
                            }}
                        >
                            Manage medicine inventory batches and monitor expiration dates.
                        </p>

                    </div>

                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "22px",
                            padding: "20px 24px",
                            display: "flex",
                            gap: "22px",
                            border: "1px solid #e5e7eb",
                        }}
                    >

                        <StatCard
                            icon={
                                <ClipboardList
                                    size={18}
                                    color="#2563eb"
                                />
                            }
                            bg="#dbeafe"
                            label="Total"
                            value={totalBatches}
                            sub="All records"
                        />

                        <StatCard
                            icon={
                                <ShieldCheck
                                    size={18}
                                    color="#16a34a"
                                />
                            }
                            bg="#dcfce7"
                            label="Active"
                            value={activeBatches}
                            sub="Not expired"
                        />

                        <StatCard
                            icon={
                                <CalendarX2
                                    size={18}
                                    color="#ef4444"
                                />
                            }
                            bg="#fee2e2"
                            label="Expired"
                            value={expiredBatches}
                            sub="Need attention"
                        />

                    </div>
                </div>

                {/* CONTENT */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "380px 1fr",
                        gap: "24px",
                    }}
                >

                    {/* FORM */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "24px",
                            padding: "28px",
                            border: "1px solid #e5e7eb",
                        }}
                    >

                        <h2
                            style={{
                                fontSize: "22px",
                                marginBottom: "24px",
                                fontWeight: "800",
                            }}
                        >
                            {editingId
                                ? "Edit Batch"
                                : "Add New Batch"}
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <InputField
                                label="Medicine ID"
                                value={form.medicine_id}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        medicine_id:
                                            e.target.value,
                                    })
                                }
                            />

                            <InputField
                                label="Batch Number"
                                value={form.batch_number}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        batch_number:
                                            e.target.value,
                                    })
                                }
                            />

                            <div
                                style={{
                                    display: "grid",
                                    gridTemplateColumns:
                                        "1fr 1fr",
                                    gap: "12px",
                                }}
                            >

                                <InputField
                                    label="Date Received"
                                    type="date"
                                    value={form.date_received}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            date_received:
                                                e.target.value,
                                        })
                                    }
                                />

                                <InputField
                                    label="Expiration Date"
                                    type="date"
                                    value={form.expiration_date}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            expiration_date:
                                                e.target.value,
                                        })
                                    }
                                />

                            </div>

                            <InputField
                                label="Qty Received"
                                value={form.quantity_received}
                                onChange={(e) =>
                                    setForm({
                                        ...form,
                                        quantity_received:
                                            e.target.value,
                                    })
                                }
                            />

                            <button
                                type="submit"
                                style={{
                                    width: "100%",
                                    height: "52px",
                                    border: "none",
                                    borderRadius: "14px",
                                    background:
                                        "linear-gradient(135deg,#2563eb,#1d4ed8)",
                                    color: "#fff",
                                    fontWeight: "700",
                                    cursor: "pointer",
                                    marginTop: "14px",
                                }}
                            >
                                {editingId
                                    ? "Update Medicine Batch"
                                    : "Add Medicine Batch"}
                            </button>

                        </form>
                    </div>

                    {/* TABLE */}
                    <div
                        style={{
                            background: "#fff",
                            borderRadius: "24px",
                            padding: "24px",
                            border: "1px solid #e5e7eb",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "18px",
                            }}
                        >

                            <h2
                                style={{
                                    margin: 0,
                                    fontSize: "24px",
                                    fontWeight: "800",
                                }}
                            >
                                Medicine Batches
                            </h2>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "10px",
                                        width: "260px",
                                        height: "48px",
                                        borderRadius: "14px",
                                        border:
                                            "1px solid #dbe2ea",
                                        padding: "0 14px",
                                        background: "#f8fafc",
                                    }}
                                >

                                    <Search
                                        size={18}
                                        color="#64748b"
                                    />

                                    <input
                                        value={search}
                                        onChange={handleSearch}
                                        placeholder="Search batch..."
                                        style={{
                                            border: "none",
                                            outline: "none",
                                            background:
                                                "transparent",
                                            width: "100%",
                                        }}
                                    />

                                </div>

                                <button
                                    onClick={handleFilterExpired}
                                    style={{
                                        height: "48px",
                                        padding: "0 18px",
                                        borderRadius: "14px",
                                        border:
                                            "1px solid #dbe2ea",
                                        background: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        fontWeight: "700",
                                        cursor: "pointer",
                                    }}
                                >
                                    <Filter size={18} />
                                    Filter
                                </button>

                            </div>
                        </div>

                        <table
                            style={{
                                width: "100%",
                                borderCollapse:
                                    "collapse",
                            }}
                        >

                            <thead>

                                <tr
                                    style={{
                                        background:
                                            "#f8fafc",
                                        height: "52px",
                                    }}
                                >
                                    <Th>BATCH</Th>
                                    <Th>MEDICINE ID</Th>
                                    <Th>DATE RECEIVED</Th>
                                    <Th>EXPIRATION</Th>
                                    <Th>QTY RECEIVED</Th>
                                    <Th>QTY REMAINING</Th>
                                    <Th>ACTIONS</Th>
                                </tr>

                            </thead>

                            <tbody>

                                {filteredBatches.map(
                                    (batch) => (

                                        <tr
                                            key={batch.id}
                                            style={{
                                                height: "62px",
                                                borderBottom:
                                                    "1px solid #edf2f7",
                                            }}
                                        >

                                            <Td bold>
                                                {batch.batch_number}
                                            </Td>

                                            <Td>
                                                {batch.medicine_id}
                                            </Td>

                                            <Td>
                                                {batch.date_received}
                                            </Td>

                                            <Td>
                                                {batch.expiration_date}
                                            </Td>

                                            <Td>
                                                {batch.quantity_received}
                                            </Td>

                                            <Td>
                                                {batch.quantity_remaining}
                                            </Td>

                                            <td
                                                style={{
                                                    padding: "0 20px",
                                                }}
                                            >

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        gap: "18px",
                                                    }}
                                                >

                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() => {

                                                            setEditingId(batch.id);

                                                            setForm({
                                                                medicine_id: batch.medicine_id,
                                                                batch_number: batch.batch_number,
                                                                date_received: batch.date_received,
                                                                expiration_date: batch.expiration_date,
                                                                quantity_received: batch.quantity_received,
                                                            });
                                                        }}
                                                        style={{
                                                            background: "transparent",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            padding: 0,
                                                        }}
                                                    >

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#eab308"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M12 20h9" />
                                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                                                        </svg>

                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        onClick={async () => {

                                                            const confirmDelete =
                                                                window.confirm(
                                                                    "Delete this batch?"
                                                                );

                                                            if (!confirmDelete)
                                                                return;

                                                            try {

                                                                await axios.delete(
                                                                    `/batches/${batch.id}`
                                                                );

                                                                const updatedBatches =
                                                                    batches.filter(
                                                                        (item) =>
                                                                            item.id !== batch.id
                                                                    );

                                                                setBatches(updatedBatches);

                                                                setFilteredBatches(updatedBatches);

                                                                alert(
                                                                    "Batch deleted successfully"
                                                                );

                                                            } catch (error) {

                                                                console.error(error);

                                                                alert(
                                                                    "Failed to delete batch"
                                                                );
                                                            }
                                                        }}
                                                        style={{
                                                            background: "transparent",
                                                            border: "none",
                                                            cursor: "pointer",
                                                            padding: 0,
                                                        }}
                                                    >

                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="22"
                                                            height="22"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="#ef4444"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6l-1 14H6L5 6" />
                                                            <path d="M10 11v6" />
                                                            <path d="M14 11v6" />
                                                            <path d="M9 6V4h6v2" />
                                                        </svg>

                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    )
                                )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

// INPUT
function InputField({
    label,
    type = "text",
    value,
    onChange,
}) {

    return (

        <div style={{ marginBottom: "16px" }}>

            <label
                style={{
                    display: "block",
                    marginBottom: "8px",
                    fontWeight: "700",
                    fontSize: "14px",
                }}
            >
                {label}
            </label>

            <input
                type={type}
                value={value}
                onChange={onChange}
                style={{
                    width: "100%",
                    height: "46px",
                    borderRadius: "14px",
                    border: "1px solid #d7dee7",
                    padding: "0 14px",
                    boxSizing: "border-box",
                    outline: "none",
                }}
            />

        </div>
    );
}

// STAT CARD
function StatCard({
    icon,
    bg,
    label,
    value,
    sub,
}) {

    return (

        <div
            style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
            }}
        >

            <div
                style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "16px",
                    background: bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {icon}
            </div>

            <div>

                <div
                    style={{
                        fontSize: "14px",
                        color: "#64748b",
                    }}
                >
                    {label}
                </div>

                <div
                    style={{
                        fontSize: "18px",
                        fontWeight: "800",
                    }}
                >
                    {value}
                </div>

                <div
                    style={{
                        fontSize: "12px",
                        color: "#94a3b8",
                    }}
                >
                    {sub}
                </div>

            </div>
        </div>
    );
}

// TABLE HEAD
function Th({ children }) {

    return (

        <th
            style={{
                textAlign: "left",
                padding: "0 20px",
                fontSize: "13px",
                color: "#64748b",
                fontWeight: "700",
            }}
        >
            {children}
        </th>
    );
}

// TABLE DATA
function Td({ children, bold }) {

    return (

        <td
            style={{
                padding: "0 20px",
                fontWeight: bold ? "700" : "500",
                fontSize: "15px",
                color: "#0f172a",
            }}
        >
            {children}
        </td>
    );
}