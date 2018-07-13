import axios from 'axios';
import {
  GET_COMPANY,
  COMPANY_LOADING,
  CLEAR_CURRENT_COMPANY,
  GET_ERRORS,
  GET_COMPANIES
} from './types';
//import { logoutUser } from '../actions/authActions';

// Get current company
export const getCurrentCompany = () => dispatch => {
  dispatch(setCompanyLoading());
  axios
    .get('/api/companies')
    .then(res =>
      dispatch({
        type: GET_COMPANY,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANY,
        payload: {}
      })
    );
};

// Create company
export const createCompany = (companyData, history) => dispatch => {
  axios
    .post('/api/companies', companyData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Get all companies
export const getCompanies = () => dispatch => {
  dispatch(setCompanyLoading());
  axios
    .get('/api/companies/all')
    .then(res =>
      dispatch({
        type: GET_COMPANIES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANIES,
        payload: null
      })
    );
};

// Company loading
export const setCompanyLoading = () => {
  return {
    type: COMPANY_LOADING
  };
};

// Clear loading
export const clearCurrentCompany = () => {
  return {
    type: CLEAR_CURRENT_COMPANY
  };
};
