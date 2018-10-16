import { GET_CONTACTS, SET_CURRENT_CONTACT } from './types';

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
