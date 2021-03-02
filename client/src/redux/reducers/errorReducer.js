import { ERRORS } from '../actions/types';

const INITIAL_STATE = {
  error: {},
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERRORS:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
export default errorReducer;
