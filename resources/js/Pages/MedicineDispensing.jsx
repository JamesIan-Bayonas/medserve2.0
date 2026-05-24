import { useState, useEffect } from "react";

export default function MedicineDispensing() {

    const [loading, setLoading] = useState(false);
    const [availableStock, setAvailableStock] = useState(0);
    const [success, setSuccess] = useState("");
    const [history, setHistory] = useState([]);

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const [form, setForm] = useState({
        resident_id: "",
        medicine_id: "",
        quantity: "",
        dosage: "",
        instructions: "",
    });

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {

        try {

            const response = await fetch(
                "/medicine-dispensing-history"
            );

            const data = await response.json();

            setHistory(data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (loading) return;

        if (!form.resident_id) {
            alert("Please select resident");
            return;
        }

        if (!form.medicine_id) {
            alert("Please select medicine");
            return;
        }

        if (!form.quantity || form.quantity <= 0) {
            alert("Enter valid quantity");
            return;
        }

        if (!form.dosage) {
            alert("Please enter dosage");
            return;
        }

        if (!form.instructions) {
            alert("Please enter instructions");
            return;
        }

        if (parseInt(form.quantity) > availableStock) {
            alert("Quantity exceeds stock");
            return;
        }

        try {

            setLoading(true);

            const response = await fetch(
                "/medicine-dispensing",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                        "X-CSRF-TOKEN":
                            document.querySelector(
                                'meta[name="csrf-token"]'
                            ).content
                    },
                    body: JSON.stringify(form)
                }
            );

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            setSuccess(data.message);

            fetchHistory();

            setForm({
                resident_id: "",
                medicine_id: "",
                quantity: "",
                dosage: "",
                instructions: "",
            });

            setAvailableStock(0);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    };

const filteredHistory = history.filter((item) => {

    const resident =
        (
            item.resident?.full_name ||
            item.resident?.fullname ||
            item.resident?.name ||
            ""
        ).toLowerCase();

    const medicine =
        (
            item.medicine?.medicine_name ||
            item.medicine?.name ||
            ""
        ).toLowerCase();

    const matchesSearch =
        resident.includes(search.toLowerCase()) ||
        medicine.includes(search.toLowerCase());

    const matchesFilter =
        filter === "all" ||
        item.medicine?.medicine_name === filter ||
        item.medicine?.name === filter;

    return matchesSearch && matchesFilter;
});

    return (

        <div style={styles.page}>

            {/* HEADER */}

            <div style={styles.topHeader}>

                <div>
                    <h1 style={styles.title}>
                        Medicine Dispensing
                    </h1>

                    <p style={styles.subtitle}>
                        Dispense medicines and monitor dispensing records.
                    </p>
                </div>

            </div>

            {/* MAIN CONTENT */}

            <div style={styles.mainGrid}>

                {/* LEFT SIDE */}

                <div style={styles.leftSide}>

                    <div style={styles.card}>

                        <div style={styles.cardTop}>

                            <div style={styles.iconBox}>
                                💊
                            </div>

                            <div>

                                <h2 style={styles.cardTitle}>
                                    Dispensing Form
                                </h2>

                                <p style={styles.cardSub}>
                                    Fill in medicine details
                                </p>

                            </div>

                        </div>

                        {
                            success && (
                                <div style={styles.success}>
                                    ✅ {success}
                                </div>
                            )
                        }

                        <form onSubmit={handleSubmit}>

                            <label style={styles.label}>
                                Resident
                            </label>

                            <select
                                name="resident_id"
                                value={form.resident_id}
                                onChange={handleChange}
                                style={styles.input}
                            >

                                <option value="">
                                    Select Resident
                                </option>

                                <option value="1">
                                    Faith Bagunbon
                                </option>

                            </select>

                            <label style={styles.label}>
                                Medicine
                            </label>

                            <select
                                name="medicine_id"
                                value={form.medicine_id}
                                onChange={(e) => {

                                    handleChange(e);

                                    const stockData = {
                                        1: 445,
                                        2: 320,
                                        3: 1250,
                                        4: 320
                                    };

                                    setAvailableStock(
                                        stockData[e.target.value] || 0
                                    );
                                }}
                                style={styles.input}
                            >

                                <option value="">
                                    Select Medicine
                                </option>

                                <option value="1">
                                    Losartan 50mg
                                </option>

                                <option value="2">
                                    Amlodipine 10mg
                                </option>

                                <option value="3">
                                    Paracetamol 500mg
                                </option>

                                <option value="4">
                                    Amoxicillin 500mg
                                </option>

                            </select>

                            <div
                                style={{
                                    ...styles.stock,
                                    background:
                                        availableStock <= 10
                                            ? "#fff7ed"
                                            : "#eff6ff",
                                    
                                }}
                            >

                                
                                    📦 Available Stock:
                                

                                {availableStock}

                            </div>

                            <div style={styles.twoColumn}>

                                <div>

                                    <label style={styles.label}>
                                        Quantity
                                    </label>

                                    <input
                                        type="number"
                                        name="quantity"
                                        value={form.quantity}
                                        onChange={handleChange}
                                        placeholder="Enter quantity"
                                        style={styles.input}
                                    />

                                </div>

                                <div>

                                    <label style={styles.label}>
                                        Dosage
                                    </label>

                                    <input
                                        type="text"
                                        name="dosage"
                                        value={form.dosage}
                                        onChange={handleChange}
                                        placeholder="Example: 1 tablet"
                                        style={styles.input}
                                    />

                                </div>

                            </div>

                            <label style={styles.label}>
                                Instructions
                            </label>

                            <textarea
                                name="instructions"
                                value={form.instructions}
                                onChange={handleChange}
                                placeholder="Take after meal"
                                style={styles.textarea}
                            />

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    ...styles.button,
                                    opacity: loading ? 0.7 : 1,
                                    cursor:
                                        loading
                                            ? "not-allowed"
                                            : "pointer"
                                }}
                            >

                                {
                                    loading
                                        ? "Dispensing..."
                                        : "Dispense Medicine"
                                }

                            </button>

                        </form>

                    </div>

                </div>

                {/* RIGHT SIDE */}

                <div style={styles.rightSide}>

                    <div style={styles.card}>

                        <div style={styles.historyHeader}>

                            <div style={styles.cardTop}>

                                <div style={styles.historyIcon}>
                                    📋
                                </div>

                                <div>

                                    <h2 style={styles.cardTitle}>
                                        Dispensing History
                                    </h2>

                                    <p style={styles.historySub}>
                                        Monitor dispensing transactions
                                    </p>

                                </div>

                            </div>

                        </div>

                        {/* SEARCH */}

                        <div style={styles.searchSection}>

                            <input
                                type="text"
                                placeholder="Search resident or medicine..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                style={styles.search}
                            />

                            <select
                                value={filter}
                                onChange={(e) =>
                                    setFilter(e.target.value)
                                }
                                style={styles.filter}
                            >

                                <option value="all">
                                    All Medicines
                                </option>

                                <option value="Losartan 50mg">
                                    Losartan 50mg
                                </option>

                                <option value="Amlodipine 10mg">
                                    Amlodipine 10mg
                                </option>

                                <option value="Paracetamol 500mg">
                                    Paracetamol 500mg
                                </option>

                                <option value="Amoxicillin 500mg">
                                    Amoxicillin 500mg
                                </option>

                            </select>

                        </div>

                        {/* TABLE */}

                        <div style={styles.tableWrapper}>

                            <table style={styles.table}>

                                <thead>

                                    <tr style={styles.tableHead}>

                                        <th style={styles.th}>
                                            Resident
                                        </th>

                                        <th style={styles.th}>
                                            Medicine
                                        </th>

                                        <th style={styles.th}>
                                            Quantity
                                        </th>

                                        <th style={styles.th}>
                                            Dosage
                                        </th>

                                        <th style={styles.th}>
                                            Date
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {
                                        filteredHistory.length > 0 ? (

                                            filteredHistory.map((item) => (

                                                <tr
                                                    key={item.id}
                                                    style={styles.row}
                                                >

                                                    <td style={styles.td}>
                                           {
                                                 item.resident?.full_name ||
                                                 item.resident?.fullname ||
                                                 item.resident?.name ||
                                                      "No Resident"
                                       }
                                     </td>

                                                   <td style={styles.td}>
                                          {
                                                item.medicine?.medicine_name ||
                                                item.medicine?.name ||
                                                      "No Medicine"
                                           }
                                       </td>

                                                    <td style={styles.td}>
                                                        {
                                                            item.quantity
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            item.dosage
                                                        }
                                                    </td>

                                                    <td style={styles.td}>
                                                        {
                                                            new Date(
                                                                item.created_at
                                                            ).toLocaleDateString()
                                                        }
                                                    </td>

                                                </tr>

                                            ))

                                        ) : (

                                            <tr>

                                                <td
                                                    colSpan="5"
                                                    style={styles.empty}
                                                >
                                                    No dispensing records found.
                                                </td>

                                            </tr>

                                        )
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

const styles = {

    page: {
        background: "#f1f5f9",
        minHeight: "100vh",
        padding: "25px",
        fontFamily: "Arial, sans-serif"
    },

    topHeader: {
        marginBottom: "22px"
    },

    title: {
        fontSize: "34px",
        fontWeight: "800",
        color: "#0f172a",
        marginBottom: "5px"
    },

    subtitle: {
        color: "#64748b",
        fontSize: "14px"
    },

    mainGrid: {
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "20px",
        alignItems: "start"
    },

    leftSide: {
        width: "100%"
    },

    rightSide: {
        width: "100%"
    },

    card: {
        background: "white",
        borderRadius: "18px",
        padding: "22px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 3px 12px rgba(0,0,0,0.04)"
    },

    cardTop: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        marginBottom: "18px"
    },

    iconBox: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "#dbeafe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px"
    },

    historyIcon: {
        width: "48px",
        height: "48px",
        borderRadius: "14px",
        background: "#ede9fe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "22px"
    },

    cardTitle: {
        fontSize: "22px",
        fontWeight: "700",
        color: "#0f172a",
        marginBottom: "3px"
    },

    cardSub: {
        color: "#64748b",
        fontSize: "13px"
    },

    historySub: {
        color: "#64748b",
        fontSize: "13px"
    },

    success: {
        background: "#dcfce7",
        color: "#166534",
        padding: "12px",
        borderRadius: "10px",
        marginBottom: "18px",
        fontWeight: "600",
        fontSize: "13px"
    },

    label: {
        display: "block",
        marginBottom: "8px",
        marginTop: "14px",
        fontWeight: "600",
        color: "#334155",
        fontSize: "13px"
    },

    input: {
        width: "100%",
        padding: "12px 14px",
        borderRadius: "12px",
        border: "1px solid #dbe2ea",
        fontSize: "14px",
        outline: "none",
        background: "#fff",
        boxSizing: "border-box"
    },

    textarea: {
        width: "100%",
        height: "110px",
        padding: "14px",
        borderRadius: "12px",
        border: "1px solid #dbe2ea",
        fontSize: "14px",
        resize: "none",
        outline: "none",
        boxSizing: "border-box"
    },

    stock: {
        padding: "13px",
        borderRadius: "12px",
        marginTop: "16px",
        fontWeight: "700",
        fontSize: "14px"
    },

    twoColumn: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "12px"
    },

    button: {
        width: "100%",
        padding: "14px",
        marginTop: "22px",
        borderRadius: "12px",
        border: "none",
        background: "#2563eb",
        color: "white",
        fontWeight: "700",
        fontSize: "15px",
        boxShadow: "0 4px 10px rgba(37,99,235,0.25)"
    },

    historyHeader: {
        marginBottom: "18px"
    },

    searchSection: {
        display: "flex",
        gap: "10px",
        marginBottom: "18px"
    },

    search: {
        flex: 1,
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #dbe2ea",
        fontSize: "13px",
        outline: "none"
    },

    filter: {
        padding: "12px",
        borderRadius: "10px",
        border: "1px solid #dbe2ea",
        fontSize: "13px",
        outline: "none",
        background: "white"
    },

    tableWrapper: {
        overflowX: "auto",
        maxHeight: "620px",
        overflowY: "auto",
        borderRadius: "14px",
        border: "1px solid #e2e8f0"
    },

    table: {
        width: "100%",
        borderCollapse: "collapse",
        background: "white"
    },

    tableHead: {
        background: "#2563eb",
        color: "white",
        position: "sticky",
        top: 0
    },

    th: {
        padding: "14px",
        textAlign: "left",
        fontSize: "13px",
        fontWeight: "700"
    },

    td: {
        padding: "14px",
        borderBottom: "1px solid #f1f5f9",
        fontSize: "13px",
        color: "#334155"
    },

    row: {
        background: "white"
    },

    empty: {
        textAlign: "center",
        padding: "20px",
        color: "#64748b",
        fontSize: "13px"
    }
};