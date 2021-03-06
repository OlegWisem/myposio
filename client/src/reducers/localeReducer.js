import { LOCALE_SET } from '../actions/types';

const initialState = {
  lang: 'fi'
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOCALE_SET:
      return { lang: action.lang };
    default:
      return state;
  }
}
