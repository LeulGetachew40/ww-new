import "../App.css";
import navStyles from "./PageNav.module.css";
import { NavLink } from "react-router-dom";
import Logo from "./Logo";

const PageNav = ({ isLoginPage = false }: { isLoginPage?: boolean }) => {
  return (
    <nav className={navStyles.nav}>
      <div>
        <Logo />
      </div>
      <div className={navStyles.nav}>
        <ul>
          <li>
            <NavLink to={"/product"}>Product</NavLink>
          </li>
          <li>
            <NavLink to={"/pricing"}>Pricing</NavLink>
          </li>
          {isLoginPage || (
            <li>
              <NavLink className={navStyles.ctaLink} to={"/login"}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default PageNav;
