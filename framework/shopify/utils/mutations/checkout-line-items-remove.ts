import { checkoutDetailFragmet } from "../common";

const checkoutLineItemRemoveMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
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
export default checkoutLineItemRemoveMutation;
