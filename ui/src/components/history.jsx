// Mock data to preview the card layout — replace with real fetch later
const mockTransactions = [
    {
        SK: "TXN#1",
        merchant: "Best Buy",
        amount: 5200,
        status: "FRAUD",
        created_at: "2026-08-22T15:47:05Z",
    },
    {
        SK: "TXN#2",
        merchant: "Metro",
        amount: 84.5,
        status: "LEGIT",
        created_at: "2026-08-21T10:12:00Z",
    },
    {
        SK: "TXN#3",
        merchant: "Uber",
        amount: 23.9,
        status: "PENDING",
        created_at: "2026-08-20T08:03:00Z",
    },
];

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
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-1">Transaction History</h1>
            <p className="text-sm text-base-content/60 mb-6">
                All transactions recorded for user 42.
            </p>

            {/* Loading state preview
      <div className="flex justify-center py-16">
        <span className="loading loading-spinner loading-lg" />
      </div>
      */}

            {/* Error state preview
      <div className="alert alert-error">
        <span>Failed to load transactions.</span>
      </div>
      */}

            {/* Empty state preview
      <div className="text-center py-16 border border-dashed border-base-300 rounded-box">
        <p className="text-base-content/60">No transactions yet</p>
      </div>
      */}

            <div className="flex flex-col gap-3">
                {mockTransactions.map((txn) => (
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
                                <span className={`badge ${statusBadgeClass[txn.status]}`}>
                  {txn.status}
                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}