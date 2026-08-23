import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const location = useLocation();

    const links = [
        { to: "/", label: "New Transaction" },
        { to: "/history", label: "History" },
        { to: "/profile", label: "Profile" },
    ];

    return (
        <div className="navbar bg-base-100 border-b border-base-200 px-4 sm:px-8">
            <div className="navbar-start">
        <span className="text-lg font-semibold tracking-tight">
          Fraud Detection System
        </span>
            </div>
            <div className="navbar-end">
                <ul className="menu menu-horizontal gap-1">
                    {links.map((link) => (
                        <li key={link.to}>
                            <Link
                                to={link.to}
                                className={location.pathname === link.to ? "active" : ""}
                            >
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}