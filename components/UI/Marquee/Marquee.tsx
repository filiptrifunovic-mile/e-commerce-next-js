import { ReactNode, FC } from "react";
import style from "./Marquee.module.css";
import Slider from "react-fast-marquee";
import cn from "classnames";

interface Props {
  children: ReactNode[];
  variant?: "primary" | "secondary";
}

const Marquee: FC<Props> = ({ children, variant = "primary" }) => {
  const rootClassName = cn(style.root2, {
    [style.secondary]: variant === "secondary",
  });

  return (
    <div className={rootClassName}>
      <Slider gradientWidth={0} speed={80} pauseOnHover={true}>
        <div className={style.container}>{children}</div>
      </Slider>
    </div>
  );
};

export default Marquee;
