import {
  SET_CURRECT_USER,
  GET_PROFILE,
  VALIDATE_TOKEN
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  profile: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRECT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload
      };
    case VALIDATE_TOKEN:
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}
