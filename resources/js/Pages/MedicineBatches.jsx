import React, { useEffect, useState } from "react";
import axios from "axios";

import {
    Search,
    Filter,
    ShieldCheck,
    CalendarX,
    UserCircle2,
    Plus,
    Pencil,
    Trash2,
    Package2,
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
        quantity_remaining: "",
    });

    // FETCH
    useEffect(() => {
        fetchBatches();
    }, []);

    // FETCH BATCHES
    const fetchBatches = async () => {

        try {

            const response = await axios.get("/api/batches");

            setBatches(response.data);
            setFilteredBatches(response.data);

        } catch (error) {

            console.error(error);
            alert("Failed to fetch batches");
        }
    };

    // SUBMIT
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            // UPDATE
            if (editingId) {

                const response = await axios.put(
                    `/api/batches/${editingId}`,
                    {
                        medicine_id: form.medicine_id,
                        batch_number: form.batch_number,
                        date_received: form.date_received,
                        expiration_date: form.expiration_date,

                        // FIXED
                        quantity_received:
                            form.quantity_received,

                        quantity_remaining:
                            form.quantity_remaining,
                    }
                );

                const updatedBatches =
                    batches.map((batch) =>
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
                    "/api/batches",
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
                quantity_remaining: "",
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

    // FILTER
    const handleFilterExpired = () => {

        if (!filterExpired) {

            const today = new Date();

            today.setHours(0, 0, 0, 0);

            const expired = batches.filter(
                (batch) => {

                    const expDate = new Date(
                        batch.expiration_date
                    );

                    expDate.setHours(0, 0, 0, 0);

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

    today.setHours(0, 0, 0, 0);

    const totalBatches = batches.length;

    const activeBatches = batches.filter(
        (batch) => {

            const expDate = new Date(
                batch.expiration_date
            );

            expDate.setHours(0, 0, 0, 0);

            return expDate > today;
        }
    ).length;

    const expiredBatches = batches.filter(
        (batch) => {

            const expDate = new Date(
                batch.expiration_date
            );

            expDate.setHours(0, 0, 0, 0);

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
                                Admin
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN */}
            <div
                style={{
                    padding: "24px 28px",
                }}
            >

                {/* TITLE */}
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

                    {/* STATS */}
                    <div
                        style={{
                            display: "flex",
                            gap: "20px",
                        }}
                    >

                       {/* TOTAL */}
<div
    style={{
        background: "#fff",
        padding: "18px",
        borderRadius: "24px",
        width: "165px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        border: "1px solid #e5e7eb",
    }}
>

    <div
        style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#dbeafe",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <Package2
            color="#2563eb"
            size={16}
        />
    </div>

    <div>

        <div
            style={{
                color: "#64748b",
                fontSize: "14px",
            }}
        >
            Total
        </div>

        <div
            style={{
                fontSize: "28px",
                fontWeight: "800",
            }}
        >
            {totalBatches}
        </div>

        <div
            style={{
                color: "#94a3b8",
                fontSize: "12px",
            }}
        >
            All records
        </div>

    </div>
</div>

{/* ACTIVE */}
<div
    style={{
        background: "#fff",
        padding: "18px",
        borderRadius: "24px",
        width: "165px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        border: "1px solid #e5e7eb",
    }}
>

    <div
        style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#dcfce7",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <ShieldCheck
            color="#16a34a"
            size={16}
        />
    </div>

    <div>

        <div
            style={{
                color: "#64748b",
                fontSize: "14px",
            }}
        >
            Active
        </div>

        <div
            style={{
                fontSize: "28px",
                fontWeight: "800",
            }}
        >
            {activeBatches}
        </div>

        <div
            style={{
                color: "#94a3b8",
                fontSize: "12px",
            }}
        >
            Not expired
        </div>

    </div>
</div>

{/* EXPIRED */}
<div
    style={{
        background: "#fff",
        padding: "18px",
        borderRadius: "24px",
        width: "165px",
        display: "flex",
        gap: "14px",
        alignItems: "center",
        border: "1px solid #e5e7eb",
    }}
>

    <div
        style={{
            width: "42px",
            height: "42px",
            borderRadius: "14px",
            background: "#fee2e2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <CalendarX
            color="#ef4444"
            size={16}
        />
    </div>

    <div>

        <div
            style={{
                color: "#64748b",
                fontSize: "14px",
            }}
        >
            Expired
        </div>

        <div
            style={{
                fontSize: "28px",
                fontWeight: "800",
            }}
        >
            {expiredBatches}
        </div>

        <div
            style={{
                color: "#94a3b8",
                fontSize: "12px",
            }}
        >
            Need attention
        </div>

    </div>
</div>
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

                            {editingId ? (

                                <InputField
                                    label="Qty Remaining"
                                    value={form.quantity_remaining}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            quantity_remaining:
                                                e.target.value,
                                        })
                                    }
                                />

                            ) : (

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

                            )}

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

                        {/* SEARCH + FILTER */}
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: "20px",
                            }}
                        >

                            <div
                                style={{
                                    position: "relative",
                                    width: "300px",
                                }}
                            >

                                <Search
                                    size={18}
                                    color="#94a3b8"
                                    style={{
                                        position: "absolute",
                                        left: "14px",
                                        top: "14px",
                                    }}
                                />

                                <input
                                    value={search}
                                    onChange={handleSearch}
                                    placeholder="Search batch..."
                                    style={{
                                        width: "100%",
                                        height: "46px",
                                        borderRadius: "14px",
                                        border: "1px solid #d7dee7",
                                        paddingLeft: "44px",
                                        outline: "none",
                                    }}
                                />

                            </div>

                            <button
                                onClick={handleFilterExpired}
                                style={{
                                    height: "46px",
                                    padding: "0 18px",
                                    borderRadius: "14px",
                                    border: "1px solid #d7dee7",
                                    background: "#fff",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    fontWeight: "700",
                                }}
                            >
                                <Filter size={16} />
                                Filter
                            </button>

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
                                                        gap: "16px",
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
                                                                quantity_remaining: batch.quantity_remaining,
                                                            });
                                                        }}
                                                        style={{
                                                            background: "transparent",
                                                            border: "none",
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <Pencil
                                                            size={20}
                                                            color="#eab308"
                                                        />
                                                    </button>

                                                    {/* DELETE */}
                                                    <button
                                                        onClick={async () => {

                                                            try {

                                                                await axios.delete(
                                                                    `/api/batches/${batch.id}`
                                                                );

                                                                const updated =
                                                                    batches.filter(
                                                                        (b) =>
                                                                            b.id !== batch.id
                                                                    );

                                                                setBatches(updated);
                                                                setFilteredBatches(updated);

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
                                                        }}
                                                    >
                                                        <Trash2
                                                            size={20}
                                                            color="#ef4444"
                                                        />
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