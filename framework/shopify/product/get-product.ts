import { ApiConfig } from "@common/types/api";
import { getProductQuery } from "@framerwork/utils";

const getProduct = async (options: {
  config: ApiConfig;
  variables: any;
}): Promise<any> => {
  const { config, variables } = options;

  const { data } = await config.fetch<any>({
    query: getProductQuery,
    url: config.apiUrl,
    variables,
  });

  console.log(JSON.stringify(data, null, 2));

  return {
    product: {
      name: "product",
      slug: "slug",
    },
  };
};

export default getProduct;
