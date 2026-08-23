import { useEffect, useState } from "react";
import { CURRENT_USER_ID } from "../config";
import { getTransactions } from "../services/api";

const statusBadgeClass = {
    LEGIT: "badge-success",
    FRAUD: "badge-error",
    PENDING: "badge-warning",
};

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD",
    }).format(amount);
}

function formatDate(isoString) {
    return new Intl.DateTimeFormat("en-CA", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(isoString));
}

export default function History() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true); // true by default — fetch starts immediately on mount
    const [error, setError] = useState(null);

    useEffect(() => {
        // useEffect's callback can't be async directly (it must not return a Promise),
        // so the async logic lives in this inner function instead.
        const loadTransactions = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getTransactions(CURRENT_USER_ID);
                // API may not guarantee order — sort newest first client-side
                const sorted = [...data].sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                );
                setTransactions(sorted);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadTransactions();
    }, []); // empty dependency array = run once, on mount only

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-1">Transaction History</h1>
            <p className="text-sm text-base-content/60 mb-6">
                All transactions recorded for user {CURRENT_USER_ID}.
            </p>

            {loading && (
                <div className="flex justify-center py-16">
                    <span className="loading loading-spinner loading-lg" />
                </div>
            )}

            {!loading && error && (
                <div className="alert alert-error">
                    <span>{error}</span>
                </div>
            )}

            {!loading && !error && transactions.length === 0 && (
                <div className="text-center py-16 border border-dashed border-base-300 rounded-box">
                    <p className="text-base-content/60">No transactions yet</p>
                </div>
            )}

            {!loading && !error && transactions.length > 0 && (
                <div className="flex flex-col gap-3">
                    {transactions.map((txn) => (
                        <div
                            key={txn.SK}
                            className="card bg-base-100 border border-base-200 shadow-sm"
                        >
                            <div className="card-body py-4 px-5 flex-row items-center justify-between">
                                <div>
                                    <p className="font-medium">{txn.merchant}</p>
                                    <p className="text-sm text-base-content/60">
                                        {formatDate(txn.created_at)}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                  <span className="font-semibold">
                    {formatCurrency(txn.amount)}
                  </span>
                                    <span
                                        className={`badge ${
                                            statusBadgeClass[txn.status] || "badge-ghost"
                                        }`}
                                    >
                    {txn.status}
                  </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}