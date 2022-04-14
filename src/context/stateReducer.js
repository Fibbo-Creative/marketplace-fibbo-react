export const initialState = {
  userProfile: {},
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
      };

    default:
      return state;
  }
};

export default stateReducer;
