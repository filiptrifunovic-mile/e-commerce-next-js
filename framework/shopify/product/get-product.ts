import { ApiConfig, Variables } from "@common/types/api";
import { getProductQuery } from "@framerwork/utils";

import { Product as ShopifyProduct } from "@framerwork/schema";

type FetchType = {
  productByHandle: ShopifyProduct;
};

const getProduct = async (options: {
  config: ApiConfig;
  variables: Variables;
}): Promise<any> => {
  const { config, variables } = options;

  const { data } = await config.fetch<FetchType>({
    query: getProductQuery,
    url: config.apiUrl,
    variables,
  });

  console.log(JSON.stringify(data.productByHandle, null, 2));

  return {
    product: {
      name: "product",
      slug: "slug",
    },
  };
};

export default getProduct;
