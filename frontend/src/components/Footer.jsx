// Site-wide footer — category links, quick links, and contact info
import { Link } from "react-router-dom";

const categories = [
  "general", "business", "entertainment", "health",
  "science", "sports", "technology",
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              PulsePress
            </Link>
            <p className="mt-3 text-sm text-gray-400 leading-relaxed">
              Your trusted source for the latest news across technology, business,
              science, health, sports, entertainment, and more.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/category/${cat}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors capitalize"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category/all" className="text-sm text-gray-400 hover:text-white transition-colors">
                  All News
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-400 hover:text-white transition-colors">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Contact
            </h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>contact@pulsepress.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} PulsePress. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
