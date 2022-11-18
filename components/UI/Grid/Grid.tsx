import style from "./Grid.module.css";
import cn from "classnames";
import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode[];
  layout?: "A" | "B";
}

const Grid: FC<Props> = ({ children, layout = "A" }) => {
  const rootClass = cn(style.root, {
    [style.layoutA]: layout === "A",
    [style.layoutB]: layout === "B",
  });

  return <div className={rootClass}>{children}</div>;
};

export default Grid;
