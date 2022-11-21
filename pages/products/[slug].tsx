import { Container } from "@components/UI";
import { getConfig } from "@framerwork/api/config";
import { getAllProductsPaths, getProduct } from "@framerwork/product";
import { Layout } from "components/common";
import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const config = getConfig();

  const { products } = await getAllProductsPaths(config);

  return {
    paths: products.map((p) => ({ params: { slug: p.slug } })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: GetStaticPropsContext<{ slug: string }>) => {
  const config = getConfig();

  const { product } = await getProduct({
    config,
    variables: { slug: params?.slug },
  });

  return {
    props: {
      product,
    },
  };
};

export default function ProductSlug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Container>
      <p>id: {product?.id}</p>
      <p>name: {product?.name}</p>
      <p>price value: {product?.price.value}</p>
      <p>price currency: {product?.price.currencyCode}</p>
      <p>description: {product?.description}</p>

      <h1 className="mb-4">Options</h1>
      <div>
        {product?.options.map((option, index) => {
          return (
            <div key={index}>
              <p>Name: {option.displayName}</p>
              {option.values.map((value, index) => {
                return (
                  <div key={index}>
                    <p>Label: {value.label}</p>
                    <p>Hex Color: {value.hexColor}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <h1 className="mb-4">Variants</h1>

      <div>
        {product?.variants.map((variant, index) => {
          return (
            <div key={index}>
              <p>Variant name: {variant.name}</p>
              {variant.options.map((vo, index) => {
                return (
                  <div key={index}>
                    <p>Name: {vo.displayName}</p>
                    {vo.values.map((value, index) => {
                      return (
                        <div key={index}>
                          <p>Label: {value.label}</p>
                          <p>Hex Color: {value.hexColor}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </Container>
  );
}

ProductSlug.Layout = Layout;
