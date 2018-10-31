import {
  GET_CONTACTS,
  SET_CURRENT_CONTACT,
  ADD_CONTACT,
  EDIT_CONTACT
} from '../actions/types';

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
    case ADD_CONTACT:
      const newContactList = state.contacts ? state.contacts : [];
      newContactList.push(action.payload);
      return {
        contacts: newContactList,
        contact: action.payload
      };
    case EDIT_CONTACT:
      const oldContactList = state.contacts ? state.contacts : [];
      const editedContactList = oldContactList.filter(
        c => c._id !== action.payload._id
      );
      editedContactList.push(action.payload);
      return { contacts: editedContactList, contact: action.payload };
    default:
      return state;
  }
}
