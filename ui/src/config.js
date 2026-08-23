// Central place for frontend config. Falls back to localhost for local backend testing
// if VITE_API_URL isn't set in .env

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Hardcoded until Cognito auth lands in a future sprint
export const CURRENT_USER_ID = "42";