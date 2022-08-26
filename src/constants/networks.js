import { ChainId } from "@sushiswap/sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const Contracts = {
  [ChainId.FANTOM]: {
    addressRegistry: "0x21955ADF7e72861C4e6F86571fa13a72B700B634",
    wftmAddress: "0xf1277d1ed8ad466beddf92ef448a132661956621",
  },
  [ChainId.FANTOM_TESTNET]: {
    addressRegistry: "0x9c4D8E1412a7e7f79Be81B79b863411eA33FFbf7",
    wftmAddress: "0xf1277d1ed8ad466beddf92ef448a132661956621",
  },
};
