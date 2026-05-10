import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Stats from "../../utils/Stats";

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, {user?.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="text-gray-500 mt-1">Here&apos;s an overview of your news portal.</p>
      </div>
      <Stats />
    </div>
  );
};

export default Dashboard;
