import { checkoutDetailFragmet } from "../common";

const checkoutCreate = `
      mutation checkoutCreate($input: CheckoutCreateInput = {}) {
      checkoutCreate(input: $input) {
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

export default checkoutCreate;
