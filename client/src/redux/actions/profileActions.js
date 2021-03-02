import axios from 'axios';

import {
  GET_PROFILE,
  // PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  ERRORS,
} from './types';

//CURRENT USER PROFILE
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profile');
    dispatch({ type: GET_PROFILE, payload: response.data });
  } catch (error) {
    dispatch({ type: ERRORS, payload: error.response.data });
  }
};
// Clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

// Create Profile
export const createProfile = (profile, history) => async (dispatch) => {
  try {
    await axios.post('/api/profile', profile);
    history.push('/dashboard');
    dispatch({ type: ERRORS, payload: {} });
  } catch (error) {
    if (error) {
      dispatch({
        type: ERRORS,
        payload: error.response.data,
      });
    }
  }
};
