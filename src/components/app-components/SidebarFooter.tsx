import sidebarStyles from "./Sidebar.module.css";
const SidebarFooter = () => {
  return (
    <footer className={sidebarStyles.footer}>
      <p className={sidebarStyles.copyright}>
        &copy;Copyright {new Date().getFullYear()} by worldwise inc.
      </p>
    </footer>
  );
};

export default SidebarFooter;
