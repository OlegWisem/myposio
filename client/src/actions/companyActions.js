import axios from 'axios';
import {
  GET_COMPANY,
  COMPANY_LOADING,
  CLEAR_CURRENT_COMPANY,
  GET_ERRORS,
  GET_COMPANIES,
  GET_COMPANY_ITEM,
  CLEAR_COMPANY_ITEM,
  CLEAR_ERRORS
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
  dispatch(clearErrors());
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

// Edit company
export const editCompany = (companyData, company_id, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/companies/${company_id}`, companyData)
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

// Get company by ID
export const getCompanyByID = id => dispatch => {
  dispatch(clearErrors());
  dispatch(setCompanyLoading());
  axios
    .get(`/api/companies/${id}`)
    .then(res =>
      dispatch({
        type: GET_COMPANY_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_COMPANY_ITEM,
        payload: null
      })
    );
};

// Delete company by ID
export const deleteCompanyByID = (company_id, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .delete(`/api/companies/${company_id}`)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Company loading
export const setCompanyLoading = () => {
  return {
    type: COMPANY_LOADING
  };
};

// Clear "company" & clear loading
export const clearCurrentCompany = () => {
  return {
    type: CLEAR_CURRENT_COMPANY
  };
};

// Clear "company_item" & clear loading
export const clearCompanyItem = () => {
  return {
    type: CLEAR_COMPANY_ITEM
  };
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
