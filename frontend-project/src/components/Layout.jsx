import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `flex items-center px-4 py-3 rounded-lg transition duration-200 ${
      isActive
        ? 'bg-indigo-800 text-white'
        : 'text-indigo-200 hover:bg-indigo-800 hover:text-white'
    }`;

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-5 border-b border-indigo-700">
          <h1 className="text-xl font-bold">SalesPro Ltd</h1>
          <p className="text-indigo-300 text-sm mt-1">SRMS</p>
        </div>
        <div className="p-4 border-b border-indigo-700">
          <p className="text-sm text-indigo-300">Welcome,</p>
          <p className="font-semibold">{user?.username}</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <NavLink to="/customers" className={linkClass}>
            <span className="mr-3">👥</span> Customers
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            <span className="mr-3">📦</span> Products
          </NavLink>
          <NavLink to="/sales" className={linkClass}>
            <span className="mr-3">💰</span> Sales
          </NavLink>
          <NavLink to="/reports" className={linkClass}>
            <span className="mr-3">📊</span> Reports
          </NavLink>
        </nav>
        <div className="p-4 border-t border-indigo-700">
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-3 rounded-lg text-indigo-200 hover:bg-red-600 hover:text-white transition duration-200 w-full"
          >
            <span className="mr-3">🚪</span> Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
