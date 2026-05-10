import { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/admin/Login";

const categories = [
  "general",
  "business",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 tracking-tight">
            PulsePress
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }>
              Home
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${cat}`}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                {cat}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <div className="flex items-center gap-2 ml-4">
                <Link
                  to="/admin"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors">
                  {user?.name || "Admin"}
                </Link>
                {/* <span className="text-sm text-gray-500">{user?.name}</span> */}
                {/* <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                  Logout
                </button> */}
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 transition-colors">
                Login
              </button>
            )}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100">
            {menuOpen ? (
              <svg
                className="w-6 h-6"
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
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/"
              end
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }>
              Home
            </NavLink>
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${cat}`}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium capitalize ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }>
                {cat}
              </NavLink>
            ))}
          </div>
          {isAuthenticated ? (
            <div className="px-3 pb-3 space-y-2">
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2 rounded-md text-base font-medium text-center bg-gray-900 text-white">
                Admin
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 rounded-md text-base font-medium text-center text-white bg-red-600 hover:bg-red-700">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                setLoginModalOpen(true);
              }}
              className="block mx-3 mb-3 px-4 py-2 rounded-md text-base font-medium text-center text-white bg-gray-900 hover:bg-gray-800 transition-colors">
              Login
            </button>
          )}
        </div>
      )}
      {loginModalOpen && (
        <Login
          isOpen={loginModalOpen}
          onClose={() => setLoginModalOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
