import cn from "classnames";
import { FC, useState } from "react";
import s from "./ProductView.module.css";
import postcss from "postcss";
import postcssNesting from "postcss-nesting";
import { Button, Container } from "@components/UI";
import Image from "next/image";
import { Product } from "@common/types/product";
import { ProductSlider, Swatch } from "@components/product";

postcss([postcssNesting(/* pluginOptions */)]).process(s /*, processOptions */);

interface Props {
  product: Product;
}

type AvailableChoices = "color" | "size" | string;

type Choices = {
  [P in AvailableChoices]: string;
};

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});

  return (
    <Container>
      <div className={cn(s.root, "fit")}>
        <div className={cn(s.productDisplay, "fit")}>
          <div className={s.nameBox}>
            <h1 className={s.name}>{product.name}</h1>
            <div className={s.price}>
              {product.price.value}
              {` `}
              {product.price.currencyCode}
            </div>
          </div>
          <ProductSlider>
            {product.images.map((image, index) => {
              return (
                <div key={index} className={s.imageContainer}>
                  <Image
                    className={s.img}
                    src={image.url}
                    alt={image.alt}
                    width={1050}
                    height={1050}
                    quality="85"
                  />
                </div>
              );
            })}
          </ProductSlider>
        </div>
        <div className={s.sidebar}>
          <section>
            {product.options.map((option) => (
              <div key={option.id} className="pb-4">
                <h2 className="uppercase font-medium">{option.displayName}</h2>
                <div className="flex flex-row py-4">
                  {option.values.map((ov) => {
                    const activeChoice =
                      choices[option.displayName.toLowerCase()];

                    return (
                      <Swatch
                        active={ov.label.toLowerCase() === activeChoice}
                        key={`${option.id}-${ov.label}`}
                        label={ov.label}
                        color={ov.hexColor}
                        variant={option.displayName}
                        onClick={() => {
                          setChoices({
                            ...choices,
                            [option.displayName.toLowerCase()]:
                              ov.label.toLowerCase(),
                          });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            ))}

            <div className="pb-14 break-words w-full max-w-xl text-lg">
              {product.description}
            </div>
          </section>
          <div>
            <Button
              className={s.button}
              aria-label="Add to Cart"
              onClick={() => alert("click")}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductView;
