import { CLEAR_CURRENT_PROFILE, GET_PROFILE } from '../actions/types';

const INITIAL_STATE = {
  profile: null,
  profiles: null,
};

const profileReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null };
    case GET_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};
export default profileReducer;
