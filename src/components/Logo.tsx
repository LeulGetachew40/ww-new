import logoStyles from "./Logo.module.css";
import { Link } from "react-router-dom";
const Logo = () => {
  return (
    <Link to={"/"}>
      <img className={logoStyles.logo} src="/logo.png" alt="" />
    </Link>
  );
};

export default Logo;
