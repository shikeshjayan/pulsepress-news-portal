import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/public/Home";
import Category from "../pages/public/Category";
import SingleNews from "../pages/public/SingleNews";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import CreateNews from "../pages/admin/CreateNews";
import Profile from "../pages/admin/Profile";
import AllNews from "../pages/admin/AllNews";
import NotFound from "../pages/public/NotFound";

// Route architecture:
//   / (MainLayout) — public pages with Navbar + Footer
//   /login — standalone login page
//   /admin (ProtectedRoute > AdminLayout) — admin CMS, requires auth
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="news/:slug" element={<SingleNews />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login isOpen={true} />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="all-news" element={<AllNews />} />
        <Route path="create-news" element={<CreateNews />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
