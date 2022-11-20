import { getConfig } from "@framerwork/api/config";
import getAllProductsPaths from "@framerwork/product/get-all-products-paths";
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
  return {
    props: {
      product: {
        slug: params?.slug,
      },
    },
  };
};

export default function ProductSlug({
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return <div>{product.slug}</div>;
}

ProductSlug.Layout = Layout;
