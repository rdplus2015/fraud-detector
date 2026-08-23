import {API_URL} from "../config.js";


/**
 * Creates a new transaction.
 * POST /transaction
 *
 * @param {{ amount: number, merchant: string, user_id: string }} payload - what WE send
 * @returns {Promise<{ message: string, item: object }>} - what the SERVER sends back
 */

export async function createTransaction(payload) {
    // Step 1: send the request, wait for the server's response headers to arrive
    const res = await fetch(`${API_URL}/transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // what WE are sending
    });

    // Step 2: wait for the response BODY to fully arrive and be parsed as JSON
    const data = await res.json(); // what the SERVER sent back

    // res.ok is true for 2xx status codes, false otherwise (e.g. 400, 500)
    if (!res.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
    }

    return data;
}




/**
 * Fetches all transactions for a given user.
 * GET /transactions/{user_id}
 *
 * @param {string} userId
 * @returns {Promise<Array<object>>} - array of transaction objects from the server
 */
export async function getTransactions(userId) {
    const res = await fetch(`${API_URL}/transactions/${userId}`);

    if (!res.ok) {
        throw new Error("Failed to load transactions.");
    }

    return res.json(); // notice: no `await` here — see note below
}