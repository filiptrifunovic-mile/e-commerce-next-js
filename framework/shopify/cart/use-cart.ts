import useCart from "@common/cart/use-cart";

export default useCart;

export const handler = {
  fetchOptions: {
    query: "",
  },
  fetcher() {
    console.log("WRONG");
    return {
      data: "cart rdy",
    };
  },
  useHook: ({ useData }: any) => {
    const data = useData();
    return { data };
  },
};
