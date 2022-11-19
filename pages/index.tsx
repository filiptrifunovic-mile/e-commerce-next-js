import type { InferGetStaticPropsType } from "next";
// import getAllProducts from "../framework/shopify/product/get-all-products";
import getAllProducts from "@framerwork/product/get-all-products";
import { getConfig } from "@framerwork/api/config";
import { Layout } from "components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero } from "@components/UI";

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
      <Hero
        headline="Hi"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quasi atque, laboriosam vel placeat accusantium! Adipisci quis repellendus officia eos."
      />
    </>
  );
}

Home.Layout = Layout;
