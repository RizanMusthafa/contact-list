import Axios from 'axios';
import { GET_CONTACTS } from './types';

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
