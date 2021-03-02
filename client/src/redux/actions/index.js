import axios from 'axios';
import setAuthTokenToHeader from '../../utils/SetAuthTokenToHeader';
import jwt_decode from 'jwt-decode';

import { ERRORS, CURRENT_USER, GET_PROFILE } from './types';

//Login Existing User if token is still valid
export const Usertoken = (history) => (dispatch) => {
  if (localStorage.jwtToken) {
    setAuthTokenToHeader(localStorage.jwtToken);
    const decoded = jwt_decode(localStorage.jwtToken); //Decode token
    const currentTime = Date.now() / 1000; // Check for expired token
    if (decoded.exp < currentTime) {
      setAuthTokenToHeader(null); //Remove the token
      dispatch({ type: GET_PROFILE, payload: null });
      dispatch({ type: CURRENT_USER, payload: null });
    } else {
      return dispatch({ type: CURRENT_USER, payload: decoded });
    }
  } else {
    history.push('/');
  }
};

// Register User
export const registerUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users/register', user);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token.token); //Save token to local storage
    setAuthTokenToHeader(token);
    const decoded = jwt_decode(token); //Decode token
    console.log(decoded);
    dispatch({ type: CURRENT_USER, payload: decoded }); // Set current user
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

// Login User
export const loginUser = (user) => async (dispatch) => {
  try {
    const response = await axios.post('/api/users/login', user);
    const { token } = response.data;
    localStorage.setItem('jwtToken', token); //Save token to local storage
    setAuthTokenToHeader(token);
    const decoded = jwt_decode(token); //Decode token
    console.log(decoded);
    dispatch({ type: CURRENT_USER, payload: decoded }); // Set current user
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

// Log user out
export const logoutUser = () => {
  localStorage.removeItem('jwtToken');
  setAuthTokenToHeader(null);
  return { type: CURRENT_USER, payload: null }; // Set current user
};

// // Login - Get User Token
// export const loginUser = (userData) => (dispatch) => {
//   axios
//     .post('/api/users/login', userData)
//     .then((res) => {
//       // Save to localStorage
//       const { token } = res.data;
//       // Set token to ls
//       localStorage.setItem('jwtToken', token);
//       // Set token to Auth header
//       setAuthToken(token);
//       // Decode token to get user data
//       const decoded = jwt_decode(token);
//       // Set current user
//       dispatch(setCurrentUser(decoded));
//     })
//     .catch((err) =>
//       dispatch({
//         type: ERRORS,
//         payload: err.response.data,
//       })
//     );
// };
