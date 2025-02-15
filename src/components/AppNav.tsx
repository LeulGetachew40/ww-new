import { NavLink } from "react-router-dom";
import appNavStyles from "./AppNav.module.css";
const AppNav = () => {
  return (
    <nav className={appNavStyles.nav}>
      <ul>
        <li>
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
