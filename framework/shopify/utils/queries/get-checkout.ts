import { checkoutDetailFragmet } from "../common";

const getCheckout = `
  query($checkoutId: ID!){
  node(id: $checkoutId) {
  ... on Checkout {
    ${checkoutDetailFragmet}
  }
  }
  }
  `;

export default getCheckout;
