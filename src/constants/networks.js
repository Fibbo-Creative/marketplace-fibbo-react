import { ChainId } from "@sushiswap/sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const Contracts = {
  [ChainId.FANTOM]: {
    addressRegistry: "0x21955ADF7e72861C4e6F86571fa13a72B700B634",
    minimalForwarder: "0x7687D1fcF56779b19beCBFae93cabAD1EA77878b",

    wftmAddress: "0xf1277d1ed8ad466beddf92ef448a132661956621",
  },
  [ChainId.FANTOM_TESTNET]: {
    addressRegistry: "0x04661ABcD31E73064BA662549aD2A3e6642f7886",
    minimalForwarder: "0x7687D1fcF56779b19beCBFae93cabAD1EA77878b",
    wftmAddress: "0x4EEf747dC4f5d110d9bCfA5C6F24b3359bD4B2d4",
  },
};
