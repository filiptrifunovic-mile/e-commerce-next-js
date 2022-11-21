import {
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
} from "../schema";
import { Product } from "@common/types/product";

function normalizeProductImages({ edges }: { edges: ImageEdge[] }) {
  return edges.map(({ node: { originalSrc: url, ...rest } }) => {
    return {
      url: `/images/${url}`,
      ...rest,
    };
  });
}

function normalizeProductPrice({ currencyCode, amount }: MoneyV2) {
  return {
    value: +amount,
    currencyCode,
  };
}

function normalizeProductOptions({
  id,
  values,
  name: displayName,
}: ProductOption) {
  const normalized = {
    id,
    displayName,
    values: values.map((value) => {
      let output: any = {
        label: value,
      };

      if (displayName.match(/colou?r/gi)) {
        output = {
          ...output,
          hexColor: value,
        };
      }

      return output;
    }),
  };

  return normalized;
}

function normalizeProductVariants({ edges }: ProductVariantConnection) {
  return edges.map(({ node }) => {
    const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;

    return {
      id,
      name: title,
      sku: sku || id,
      price: +priceV2.amount,
      listPrice: +compareAtPriceV2?.amount,
      requiresShipping: true,
    };
  });
}

export function normalizeProduct(productNode: ShopifyProduct): Product {
  const {
    id,
    title: name,
    handle,
    images: imageConnection,
    vendor,
    description,
    priceRange,
    options,
    variants,
    ...rest
  } = productNode;

  const product = {
    id,
    name,
    vendor,
    description,

    path: `/${handle}`,
    slug: handle.replace(/^\/+|\/+$/g, ""),
    images: normalizeProductImages(imageConnection),
    price: normalizeProductPrice(priceRange.minVariantPrice),
    options: options
      ? options
          .filter((o) => {
            return o.name !== "Title";
          })
          .map((o) => normalizeProductOptions(o))
      : [],
    variants: variants ? normalizeProductVariants(variants) : [],
    ...rest,
  };

  return product;
}
