import { FC, ReactNode, Children, isValidElement } from "react";
import React from "react";
import s from "./ProductSider.module.css";
import { useKeenSlider } from "keen-slider/react";
import cn from "classnames";

type SliderProps = {
  children: ReactNode;
};

const ProductSlider: FC<SliderProps> = ({ children }) => {
  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
    slideChanged(slider) {},
    // created() {
    //   setLoaded(true);
    // },
  });

  return (
    <div className={s.root}>
      <div ref={sliderRef} className="keen-slider h-full transition-opacity">
        <button
          onClick={(e) => e.stopPropagation() || instanceRef.current?.prev()}
          className={cn(s.leftControl, s.control)}
        />

        <button
          onClick={(e) => e.stopPropagation() || instanceRef.current?.next()}
          className={cn(s.rightControl, s.control)}
        />

        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            return {
              ...child,
              props: {
                ...child.props,
                className: `${
                  child.props.className ? `${child.props.className}` : ""
                } keen-slider__slide`,
              },
            };
          }
          return child;
        })}
      </div>
    </div>
  );
};

export default ProductSlider;
