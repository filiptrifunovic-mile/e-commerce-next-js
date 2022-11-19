import { ReactNode, FC } from "react";
import style from "./Marquee.module.css";
import Marqueee from "react-fast-marquee";

interface Props {
  children: ReactNode[];
}

const Marquee: FC<Props> = ({ children }) => {
  return (
    <div className={style.root2}>
      <Marqueee gradientWidth={100}>
        <div className={style.container}>{children}</div>
      </Marqueee>
    </div>
  );
};

export default Marquee;
