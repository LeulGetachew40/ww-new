import { MouseEvent, ReactNode } from "react";
import btnStyles from "./Button.module.css";
interface ButtonProps {
  children: ReactNode;
  btnClass: string;
  handleClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}
const Button = ({ children, btnClass, handleClick }: ButtonProps) => {
  return (
    <button
      className={`${btnStyles.btn} ${btnStyles[btnClass]}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
