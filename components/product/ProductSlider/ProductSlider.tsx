import { FC, ReactNode } from "react";
import s from "./ProductSider.module.css";

type SliderProps = {
  children: ReactNode;
};

const ProductSlider: FC<SliderProps> = ({ children }) => {
  return (
    <div className={s.root}>
      <div className="h-full transition-opacity duration-150">{children}</div>
    </div>
  );
};

export default ProductSlider;
