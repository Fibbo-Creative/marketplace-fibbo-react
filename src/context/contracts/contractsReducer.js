export const constractsInitialState = {
  provider: {},
  nftContracts: {},
  // TEMPLATE - ADD YOUR CUSTOM CONTRACT
  signer: {},
  web3Modal: {},
  wallet: "",
  balance: 0,
  correctChain: true,
};

export const contractActionTypes = {
  SET_USER: "SET_USER",
  SET_MARKET_ITEMS: "SET_MARKET_ITEMS",
  SET_MARKET_ITEMS_FILTERED: "SET_MARKET_ITEMS_FILTERED",
  SET_WALLET: "SET_WALLET",
  SET_BALANCE: "SET_BALANCE",
  SET_MY_ITEMS: "SET_MY_ITEMS",
};

const contractReducer = (state, action) => {
  switch (action.type) {
    case contractActionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
        authorized: true,
      };
    case contractActionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.marketItems,
        marketItemsFiltered: action.marketItems,
      };
    case contractActionTypes.SET_MARKET_ITEMS_FILTERED:
      return {
        ...state,
        marketItemsFiltered: action.marketItems,
      };
    case contractActionTypes.SET_MY_ITEMS:
      return {
        ...state,
        myItems: action.myItems,
        balance: action.balance,
      };
    case contractActionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };
    case contractActionTypes.SET_WALLET:
      return {
        ...state,
        // TEMPLATE - ADD YOUR CUSTOM CONTRACT
        signer: action.signer,
        wallet: action.wallet,
        provider: action.provider,
        web3Modal: action.web3Modal,
        correctChain: action.correctChain,
      };
    default:
      return state;
  }
};

export default contractReducer;
