import Sidebar from "../components/app-components/Sidebar";
import Map from "../components/app-components/Map";
import appStyles from "./AppLayout.module.css";

const AppLayout = () => {
  return (
    <div className={appStyles.app}>
      <Sidebar />
      <Map />
    </div>
  );
};

export default AppLayout;
