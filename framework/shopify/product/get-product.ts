import { ApiConfig } from "@common/types/api";
import { getProductQuery } from "@framerwork/utils";

const getProduct = async (config: ApiConfig): Promise<any> => {
  const { data } = await config.fetch<any>({
    query: getProductQuery,
    url: config.apiUrl,
  });

  return {
    product: {
      name: "product",
      slug: "slug",
    },
  };
};

export default getProduct;
