import { GET_CONTACTS } from '../actions/types';

const initialState = {
  contacts: null,
  contact: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CONTACTS:
      return { contacts: action.payload, contact: null };
    default:
      return state;
  }
}
