import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import companyReducer from './companyReducer';
import localeReducer from './localeReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  company: companyReducer,
  locale: localeReducer
});
