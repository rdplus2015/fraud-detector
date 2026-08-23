import './index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/navbar.tsx";
import {TransactionForm} from "./components/transactionForm.jsx";
import Profile from "./components/profile.jsx";
import History from "./components/history.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-base-200/40">
                <Navbar />
                <Routes>
                    <Route path="/" element={<TransactionForm />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}
