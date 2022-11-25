import cn from "classnames";
import { FC, useState } from "react";
import s from "./ProductView.module.css";
import { Button, Container } from "@components/UI";
import Image from "next/legacy/image";
import { Product } from "@common/types/product";
import { ProductSlider, Swatch } from "@components/product";
import { Choices, getVariant } from "../helpers";
import { useUI } from "@components/UI/context";
import useAdditem from "@framerwork/cart/use-add-item";

interface Props {
  product: Product;
}

const ProductView: FC<Props> = ({ product }) => {
  const [choices, setChoices] = useState<Choices>({});
  const { openSidebar } = useUI();

  const addItem = useAdditem();

  const variant = getVariant(product, choices);

  const addToCart = async () => {
    try {
      const item = {
        productId: String(product.id),
        variantId: variant?.id,
        variantOptions: variant?.options,
      };
      const output = await addItem(item);
      alert(JSON.stringify(output));
      openSidebar();
    } catch (error) {}
  };

  return (
    <Container>
      <div className={cn(s.root, "fit", "mb-5")}>
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
                    height={1200}
                    quality="85"
                    // layout=""
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
          <div className="btn-container">
            <Button
              className={s.button}
              aria-label="Add to Cart"
              onClick={addToCart}
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
