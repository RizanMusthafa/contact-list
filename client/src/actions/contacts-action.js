import Axios from 'axios';
import { GET_CONTACTS, SET_CURRENT_CONTACT } from './types';

export const getContacts = token => async dispatch => {
  const res = await Axios.get('http://localhost:3300/api/contacts/', {
    headers: {
      'x-auth-token': token
    }
  });
  dispatch({
    type: GET_CONTACTS,
    payload: res.data.results
  });
};

export const setCurrentContact = contact => {
  return {
    type: SET_CURRENT_CONTACT,
    payload: contact
  };
};
