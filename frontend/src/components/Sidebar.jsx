import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="w-64 bg-white shadow-md p-6">
      <h1 className="text-2xl font-bold text-blue-600 mb-8">
        Expense Tracker
      </h1>

      <nav className="space-y-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/transactions"
          className={({ isActive }) =>
            `block p-2 rounded ${
              isActive
                ? "bg-blue-100 text-blue-600"
                : "text-gray-600 hover:bg-gray-100"
            }`
          }
        >
          Transactions
        </NavLink>

        <button
          onClick={handleLogout}
          className="w-full text-left p-2 rounded text-red-500 hover:bg-red-50"
        >
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
