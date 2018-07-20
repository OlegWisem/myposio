import {
  GET_COMPANY,
  GET_COMPANIES,
  COMPANY_LOADING,
  CLEAR_CURRENT_COMPANY,
  GET_COMPANY_ITEM,
  CLEAR_COMPANY_ITEM,
  GET_COMPANY_FOR_REVIEW,
  PUBLISH_COMPANY
} from '../actions/types';

const initialState = {
  company: null,
  companies: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMPANY_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_COMPANY:
      return {
        ...state,
        company: action.payload,
        loading: false
      };
    case GET_COMPANY_FOR_REVIEW:
      return {
        ...state,
        company: action.payload,
        loading: false
      };
    case PUBLISH_COMPANY:
      return {
        ...state,
        company: state.company.filter(company => company._id !== action.payload)
      };
    case GET_COMPANY_ITEM:
      return {
        ...state,
        company_item: action.payload,
        loading: false
      };
    case GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        loading: false
      };
    case CLEAR_CURRENT_COMPANY:
      return {
        ...state,
        company: null
      };
    case CLEAR_COMPANY_ITEM:
      return {
        ...state,
        company_item: null
      };
    default:
      return state;
  }
}
