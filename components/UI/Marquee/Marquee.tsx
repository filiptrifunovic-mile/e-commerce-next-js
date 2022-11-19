import { ReactNode, FC } from "react";
import style from "./Marquee.module.css";

interface Props {
  children: ReactNode[];
}

const Marquee: FC<Props> = ({ children }) => {
  return <div className={style.root2}>{children}</div>;
};

export default Marquee;
