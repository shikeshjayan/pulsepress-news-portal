// Wraps public pages with Navbar / Footer; shows a loading screen until news data is ready
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LoadingScreen from "../components/LoadingScreen";
import { useNews } from "../hooks/useNews";

const MainLayout = () => {
  const { loading } = useNews();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
};

export default MainLayout;
