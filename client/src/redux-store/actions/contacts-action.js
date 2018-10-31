import {
  GET_CONTACTS,
  SET_CURRENT_CONTACT,
  ADD_CONTACT,
  EDIT_CONTACT
} from './types';

export const setContacts = contacts => {
  return {
    type: GET_CONTACTS,
    payload: contacts
  };
};

export const setCurrentContact = contact => {
  return {
    type: SET_CURRENT_CONTACT,
    payload: contact
  };
};

export const addContact = contact => {
  const { _id, firstName, lastName } = contact;
  return {
    type: ADD_CONTACT,
    payload: { _id, firstName, lastName }
  };
};

export const editContact = contact => {
  const { _id, firstName, lastName } = contact;
  return {
    type: EDIT_CONTACT,
    payload: { _id, firstName, lastName }
  };
};
