export const initialState = {
  userProfile: {},
  wallet: "",
  verifiedAddress: false,
  balance: 0,
  correctChain: true,
  updatedWFTM: false,
};

export const actionTypes = {
  SET_USER_PROFILE: "SET_USER_PROFILE",
  SET_PROFILE_BANNER: "SET_PROFILE_BANNER",
  SET_PROFILE_IMAGE: "SET_PROFILE_IMAGE",
  SET_USERNAME: "SET_USERNAME",
  UPDATED_WFTM: "UPDATED_WFTM",
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
    case actionTypes.SET_PROFILE_IMAGE:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          profileImg: action.image,
        },
      };
    case actionTypes.SET_PROFILE_BANNER:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          profileBanner: action.banner,
        },
      };
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          username: action.username,
        },
      };
    case actionTypes.UPDATED_WFTM:
      return {
        ...state,
        updatedWFTM: !state.updatedWFTM,
      };

    default:
      return state;
  }
};

export default stateReducer;
