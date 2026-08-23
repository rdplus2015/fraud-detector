export  function TransactionForm() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-1">New Transaction</h1>
            <p className="text-sm text-base-content/60 mb-6">
                Submit a transaction to run it through the fraud scoring engine.
            </p>

            <form className="card bg-base-100 border border-base-200 shadow-sm">
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
                        />
                    </div>

                    {/* Success state preview — remove once logic is wired */}
                    <div className="alert alert-success">
                        <span>Transaction recorded successfully.</span>
                    </div>

                    {/* Error state preview — remove once logic is wired */}
                    <div className="alert alert-error">
                        <span>Amount is required and must be greater than 0.</span>
                    </div>

                    <div className="card-actions justify-end mt-2">
                        <button type="submit" className="btn btn-neutral">
                            Submit Transaction
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}