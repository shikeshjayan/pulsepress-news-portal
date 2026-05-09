import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AdminLayout from "../layouts/AdminLayoute";
import ProtectedRoute from "../components/ProtectedRoute";

import Home from "../pages/public/Home";
import Category from "../pages/public/Category";
import SingleNews from "../pages/public/SingleNews";
import GeneralNews from "../pages/public/NewsByCategories/GeneralNews";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import CreateNews from "../pages/admin/CreateNews";
import EditNews from "../pages/admin/EditNews";
import Profile from "../pages/admin/Profile";
import BusinessNews from "../pages/public/NewsByCategories/BusinessNews";
import EntertainmentNews from "../pages/public/NewsByCategories/EntertainmentNews";
import HealthNews from "../pages/public/NewsByCategories/HealthNews";
import ScienceNews from "../pages/public/NewsByCategories/ScienceNews";
import SportsNews from "../pages/public/NewsByCategories/SportsNews";
import TechnologyNews from "../pages/public/NewsByCategories/TechnologyNews";
import LogoutConfirmModal from "../utils/LogoutConfirmModal";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="category/general" element={<GeneralNews />} />
        <Route path="category/business" element={<BusinessNews />} />
        <Route path="category/entertainment" element={<EntertainmentNews />} />
        <Route path="category/health" element={<HealthNews />} />
        <Route path="category/science" element={<ScienceNews />} />
        <Route path="category/sports" element={<SportsNews />} />
        <Route path="category/technology" element={<TechnologyNews />} />
        <Route path="category/:id" element={<Category />} />
        <Route path="news/:slug" element={<SingleNews />} />
      </Route>
      <Route path="/login" element={<Login isOpen={true} />} />
      <Route path="/logout" element={<LogoutConfirmModal/>} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="create-news" element={<CreateNews />} />
        <Route path="edit-news/:id" element={<EditNews />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
