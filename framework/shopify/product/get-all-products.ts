import getAllProductsQuery from "../utils/queries/get-all-products";
import fetchApi from "../utils/fetch-api";
import { ProductConnection } from "../schema";
import { normalizeProduct } from "../utils/normalize";

type ReturnType = {
  products: ProductConnection;
};

const getAllProducts = async (): Promise<any> => {
  const { data } = await fetchApi<ReturnType>({
    query: getAllProductsQuery,
  });

  const products =
    data.products.edges.map(({ node: product }) => {
      return normalizeProduct(product);
    }) ?? [];

  return products;
};

export default getAllProducts;
