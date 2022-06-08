import { ChainId } from "@sushiswap/sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const Contracts = {
  [ChainId.FANTOM]: {
    addressRegistry: "0x260ceD9e586082227Ec4513898CEc60E474063C5",
  },
  [ChainId.FANTOM_TESTNET]: {
    addressRegistry: "0x50dbc3b7551A18369F9Fd76E150Cc6BcF6df77F5",
  },
};
