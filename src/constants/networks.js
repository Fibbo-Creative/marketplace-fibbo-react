import { ChainId } from "@sushiswap/sdk";

export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const Contracts = {
  [ChainId.FANTOM]: {
    addressRegistry: "0x1C2123D5E78FE2a107c0bC76d5260393F7775DD8",
    minimalForwarder: "0x944f2A65742dbe3963BeDeE9d55cdF02572db6Da",
    wftmAddress: "0x4F749478513C5433C02d31721f21Dc8f73A003Af",
    autotaskURL:
      "https://api.defender.openzeppelin.com/autotasks/916b92b5-3b76-4c4a-80df-1abf8a29e65e/runs/webhook/3185bde5-abcb-4ba8-90ca-3f40635cca92/36Q8d9V6MWW8zeySQ2rX7h",
  },
  [ChainId.FANTOM_TESTNET]: {
    addressRegistry: "0x1C2123D5E78FE2a107c0bC76d5260393F7775DD8",
    minimalForwarder: "0x944f2A65742dbe3963BeDeE9d55cdF02572db6Da",
    wftmAddress: "0x4F749478513C5433C02d31721f21Dc8f73A003Af",
    autotaskURL:
      "https://api.defender.openzeppelin.com/autotasks/8b6b204b-dd98-4269-8753-6bf66920a47c/runs/webhook/3185bde5-abcb-4ba8-90ca-3f40635cca92/8SmByTspP4oQxdD6WfFea9",
  },
};
