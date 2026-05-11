// Admin sidebar — navigation links, user info, and logout button
import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import LogoutConfirmModal from "../../components/LogoutConfirmModal";

const links = [
  { to: "/admin", label: "Dashboard", end: true },
  { to: "/admin/all-news", label: "Manage News", end: false },
  { to: "/admin/create-news", label: "Create News", end: false },
  { to: "/admin/profile", label: "Profile", end: false },
];

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowLogoutModal(false);
    navigate("/");
  };
  const handleHome = () => {
    navigate("/");
  };

  const handleNavClick = () => {
    if (window.innerWidth < 768) onClose?.();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`
          w-64 bg-gray-900 text-white flex flex-col
          fixed md:sticky top-0 left-0 z-50 h-screen
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div>
            <h2 className="text-xl font-bold">PulsePress</h2>
            <p className="text-sm text-gray-400 mt-1">Admin Panel</p>
          </div>
          <button
            onClick={handleHome}
            aria-label="Go to homepage"
            className="text-gray-400 hover:text-white transition-colors cursor-pointer">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 32 32">
              <path d="M 16 2.59375 L 15.28125 3.28125 L 2.28125 16.28125 L 3.71875 17.71875 L 5 16.4375 L 5 28 L 14 28 L 14 18 L 18 18 L 18 28 L 27 28 L 27 16.4375 L 28.28125 17.71875 L 29.71875 16.28125 L 16.71875 3.28125 Z M 16 5.4375 L 25 14.4375 L 25 26 L 20 26 L 20 16 L 12 16 L 12 26 L 7 26 L 7 14.4375 Z"></path>
            </svg>
          </button>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white cursor-pointer"
            aria-label="Close sidebar">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`
              }>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-700">
          <p className="text-sm text-gray-400 truncate">{user?.name}</p>
          <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          <button
            onClick={() => setShowLogoutModal(true)}
            className="mt-3 w-full px-3 py-2 rounded text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors cursor-pointer">
            Logout
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <LogoutConfirmModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
