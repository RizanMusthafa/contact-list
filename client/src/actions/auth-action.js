import { LOGIN } from './types';
import Axios from 'axios';

export const login = (user, token, cb) => async dispatch => {
  if (!token) {
    const res = await Axios.post('http://localhost:3300/api/users/login', user);
    token = res.data.results;
  }
  localStorage.setItem('token', token);
  dispatch({
    type: LOGIN,
    payload: token
  });
};
