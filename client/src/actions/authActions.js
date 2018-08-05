import axios from 'axios';
import {
  GET_ERRORS,
  SET_CURRECT_USER,
  GET_PROFILE,
  CLEAR_ERRORS,
  VALIDATE_TOKEN
} from './types';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Save to local storage
      const { token } = res.data;

      // Set token to local storage
      localStorage.setItem('jwtToken', token);

      // Set token to Auth header
      setAuthToken(token);

      // Decode token to get user data
      const decoded = jwt_decode(token);

      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Change Password
export const changePassword = userData => dispatch => {
  axios
    .post('/api/users/changepassword', userData)
    .then(res => dispatch(logoutUser()))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(clearErrors());
  axios
    .get('/api/users/current')
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// Update profile
export const updateProfile = (userData, history, logout) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/api/users/update', userData)
    .then(res => {
      if (logout) {
        dispatch(logoutUser());
      } else {
        history.push('/dashboard');
      }
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Request new password
export const requestNewPassword = (userData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('api/users/forgot', userData)
    .then(res => history.push('/forgot-password/success'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Validate token
export const validateToken = userData => dispatch => {
  axios
    .get(
      `api/users/reset?email=${userData.email}&token=${userData.token}&lang=${
        userData.lang
      }`
    )
    .then(res =>
      dispatch({
        type: VALIDATE_TOKEN,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set new password
export const setNewPassword = (paramsData, userData, history) => dispatch => {
  axios
    .post(
      `api/users/reset?email=${paramsData.email}&token=${paramsData.token}`,
      userData
    )
    .then(res => history.push('/login'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRECT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem('jwtToken');

  // Remove auth header for future requests
  setAuthToken(false);

  // Set currect user to {}
  // Set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
