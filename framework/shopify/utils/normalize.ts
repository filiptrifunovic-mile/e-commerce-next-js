import {
  Checkout,
  CheckoutLineItemEdge,
  ImageEdge,
  MoneyV2,
  Product as ShopifyProduct,
  ProductOption,
  ProductVariantConnection,
  SelectedOption,
} from "../schema";
import { Product } from "@common/types/product";
import { Cart } from "@common/types/cart";

export const normalizeCart = (checkout: Checkout): Cart => {
  return {
    id: checkout.id,
    createdAt: checkout.createdAt,
    currency: {
      code: checkout.totalPriceV2.currencyCode,
    },
    taxesIncluded: checkout.taxesIncluded,
    lineItemsSubtotalPrice: +checkout.subtotalPriceV2.amount,
    totalPrice: checkout.totalPriceV2.amount,
    lineItems: checkout.lineItems.edges.map(normalizeLineItem),
    discounts: [],
  };
};

const normalizeLineItem = ({
  node: { id, title, variant, ...rest },
}: CheckoutLineItemEdge): any => {
  return {
    id,
    variantId: String(variant?.id),
    productId: String(variant?.id),
    name: title,
    path: variant?.product?.handle ?? "",
    discounts: [],
    //options
    variant: {
      id: String(variant?.id),
      sku: variant?.sku ?? "",
      name: variant?.title,
      //image
      requiresShipping: variant?.requiresShipping ?? false,
      price: variant?.priceV2.amount,
      listPrice: variant?.compareAtPriceV2?.amount,
    },
    ...rest,
  };
};

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
      options: selectedOptions.map(({ name, value }: SelectedOption) => {
        const option = normalizeProductOptions({
          id,
          name,
          values: [value],
        });

        return option;
      }),
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
