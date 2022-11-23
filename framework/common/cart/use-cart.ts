import { ApiHooks } from "@common/types/hooks";
import { useHook, useSWRHook } from "@common/utils/use-hook";
import { SHOPIFY_CHECKOUT_ID_COOKIE } from "@framerwork/const";
import Cookies from "js-cookie";

const useCart = () => {
  const hook = useHook((hooks: ApiHooks) => hooks.cart.useCart);

  const fetcherWrapper: typeof hook.fetcher = (context) => {
    context.input.checkoutId = Cookies.get(SHOPIFY_CHECKOUT_ID_COOKIE);

    return hook.fetcher(context);
  };

  return useSWRHook({ ...hook, fetcherWrapper });
};

export default useCart;
