import { useState } from "react";
import { CURRENT_USER_ID } from "../config";
import { createTransaction } from "../services/api";

const initialForm = { amount: "", merchant: "" };

export default function TransactionForm() {
    const [form, setForm] = useState(initialForm);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState(null); // { type: "success" | "error", message: string }

    const handleChange = (e) => {
        const { name, value } = e.target;
        // [name] is a computed key: uses the input's `name` attribute value ("amount" or "merchant")
        // as the object key, instead of the literal word "name"
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const validate = () => {
        if (!form.amount || Number(form.amount) <= 0) {
            return "Amount is required and must be greater than 0.";
        }
        if (!form.merchant.trim()) {
            return "Merchant is required.";
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFeedback(null);

        const validationError = validate();
        if (validationError) {
            setFeedback({ type: "error", message: validationError });
            return;
        }

        setLoading(true);
        try {
            await createTransaction({
                amount: Number(form.amount),
                merchant: form.merchant.trim(),
                user_id: CURRENT_USER_ID,
            });

            setFeedback({ type: "success", message: "Transaction recorded successfully." });
            setForm(initialForm);
        } catch (err) {
            setFeedback({ type: "error", message: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-1">New Transaction</h1>
            <p className="text-sm text-base-content/60 mb-6">
                Submit a transaction to run it through the fraud scoring engine.
            </p>

            <form onSubmit={handleSubmit} className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body gap-4">
                    <div className="form-control">
                        <label className="label" htmlFor="amount">
                            <span className="label-text">Amount (CAD)</span>
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            step="0.01"
                            min="0"
                            placeholder="0.00"
                            className="input input-bordered w-full"
                            value={form.amount}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    <div className="form-control">
                        <label className="label" htmlFor="merchant">
                            <span className="label-text">Merchant</span>
                        </label>
                        <input
                            id="merchant"
                            name="merchant"
                            type="text"
                            placeholder="e.g. Best Buy"
                            className="input input-bordered w-full"
                            value={form.merchant}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>

                    {feedback && (
                        <div
                            className={`alert ${
                                feedback.type === "success" ? "alert-success" : "alert-error"
                            }`}
                        >
                            <span>{feedback.message}</span>
                        </div>
                    )}

                    <div className="card-actions justify-end mt-2">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading && <span className="loading loading-spinner loading-sm" />}
                            {loading ? "Submitting..." : "Submit Transaction"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}