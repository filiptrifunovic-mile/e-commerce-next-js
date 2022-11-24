import { checkoutDetailFragmet } from "../common";

const checkoutLineItemsAdd = `
  mutation(
  $checkoutId: ID!,
  $lineItems: [CheckoutLineItemInput!]!) {
  checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
    checkoutUserErrors {
      field
      message
    }
    checkout {
      ${checkoutDetailFragmet}
    }
  }
}
`;

export default checkoutLineItemsAdd;
