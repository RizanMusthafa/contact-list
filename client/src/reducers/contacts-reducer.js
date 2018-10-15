import { GET_CONTACTS, SET_CURRENT_CONTACT } from '../actions/types';

const initialState = {
  contacts: null,
  contact: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return { contacts: action.payload, contact: action.payload[0] };
    case SET_CURRENT_CONTACT:
      return { ...state, contact: action.payload };
    default:
      return state;
  }
}
