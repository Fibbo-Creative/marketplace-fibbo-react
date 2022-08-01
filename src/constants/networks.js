import { ChainId } from "@sushiswap/sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const Contracts = {
  [ChainId.FANTOM]: {
    addressRegistry: "0x21955ADF7e72861C4e6F86571fa13a72B700B634",
    wftmAddress: "0xf1277d1ed8ad466beddf92ef448a132661956621",
  },
  [ChainId.FANTOM_TESTNET]: {
    addressRegistry: "0x4273fBB5513A8A52B8B980d70A5cFabbfdAd17D6",
    wftmAddress: "0xf1277d1ed8ad466beddf92ef448a132661956621",
  },
};
