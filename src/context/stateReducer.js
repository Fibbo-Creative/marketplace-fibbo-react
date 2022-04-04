export const initialState = {
  myItems: [],
  marketItems: [],
  marketItemsFiltered: [],
  wallet: "",
  balance: 0,
  correctChain: true,
};

export const actionTypes = {
  SET_MARKET_ITEMS: "SET_MARKET_ITEMS",
  SET_MARKET_ITEMS_FILTERED: "SET_MARKET_ITEMS_FILTERED",
  SET_MY_ITEMS: "SET_MY_ITEMS",
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_MARKET_ITEMS:
      return {
        ...state,
        marketItems: action.marketItems,
        marketItemsFiltered: action.marketItems,
      };
    case actionTypes.SET_MARKET_ITEMS_FILTERED:
      return {
        ...state,
        marketItemsFiltered: action.marketItems,
      };
    case actionTypes.SET_MY_ITEMS:
      return {
        ...state,
        myItems: action.myItems,
        balance: action.balance,
      };
    case actionTypes.SET_BALANCE:
      return {
        ...state,
        balance: action.balance,
      };

    default:
      return state;
  }
};

export default stateReducer;
