import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products";
import getAllProducts from "@framerwork/product/get-all-products";
import { getConfig } from "@framerwork/api/config";
import { Layout } from "components/common";
import { ProductCard } from "@components/product";
import { Grid } from "@components/UI";

export async function getStaticProps() {
  const config = getConfig();

  const products = await getAllProducts(config);

  return {
    props: {
      products,
    },
    revalidate: 4 * 60 * 60,
  };
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Grid>
        {products.slice(0, 3).map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </Grid>
    </>
  );
}

Home.Layout = Layout;
