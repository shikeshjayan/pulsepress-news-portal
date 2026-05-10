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
import LogoutConfirmModal from "../utils/LogoutConfirmModal";
import Stats from "../utils/Stats";
import AllNews from "../pages/admin/AllNews";
import Pagination from "../utils/Pagination";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="news/:slug" element={<SingleNews />} />
      </Route>
      <Route path="/login" element={<Login isOpen={true} />} />
      <Route path="/logout" element={<LogoutConfirmModal />} />
      <Route path="/stats" element={<Stats />} />
      <Route path="/pagination" element={<Pagination />} />
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
