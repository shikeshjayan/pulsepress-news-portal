// Catch-all 404 page for unmatched public routes
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 py-24 text-center">
      <h1 className="text-7xl font-bold text-gray-900 mb-4">404</h1>
      <p className="text-xl text-gray-600 mb-8">
        Page not found.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
      >
        Go Home
      </Link>
    </section>
  );
};

export default NotFound;
