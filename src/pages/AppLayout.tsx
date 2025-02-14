import Sidebar from "../components/app-components/Sidebar";
import Map from "../components/app-components/Map";
import appStyles from "./AppLayout.module.css";
import { useAuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const AppLayout = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <div className={appStyles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
