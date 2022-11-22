import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import s from "./Button.module.css";
import cn from "classnames";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
  // onClick: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button type="button" className={cn(s.root, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
