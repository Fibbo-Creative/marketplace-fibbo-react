export const initialState = {
  userProfile: {},
  wallet: "",
  verifiedAddress: false,
  balance: 0,
  correctChain: true,
};

export const actionTypes = {
  SET_USER_PROFILE: "SET_USER_PROFILE",
};

const stateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.userProfile,
        wallet: action.wallet,
        verifiedAddress: action.verifiedAddress,
      };

    default:
      return state;
  }
};

export default stateReducer;
