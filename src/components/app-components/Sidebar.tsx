import { Outlet } from "react-router-dom";
import AppNav from "../AppNav";
import Logo from "../Logo";
import sidebarStyles from "./Sidebar.module.css";
import SidebarFooter from "./SidebarFooter";

const Sidebar = () => {
  return (
    <div className={sidebarStyles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <SidebarFooter />
    </div>
  );
};

export default Sidebar;
