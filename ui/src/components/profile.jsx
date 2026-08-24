import { Link } from "react-router-dom";
import {CURRENT_USER_ID} from "../config.js";

export default function Profile() {
    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-semibold mb-1">Profile</h1>
            <p className="text-sm text-base-content/60 mb-6">
                Your account details.
            </p>

            <div className="card bg-base-100 border border-base-200 shadow-sm">
                <div className="card-body gap-4">
                    <div>
                        <p className="text-sm text-base-content/60">User ID</p>
                        <p className="text-lg font-medium">{CURRENT_USER_ID}</p>
                    </div>

                    <div className="card-actions">
                        <Link to="/history" className="btn btn-outline btn-sm">
                            View transaction history
                        </Link>
                    </div>

                    <p className="text-xs text-base-content/40 mt-2">
                        Sign-in with Cognito is planned for a future sprint.
                    </p>
                </div>
            </div>
        </div>
    );
}