import { LOGIN, LOGOUT } from './types';

export const login = token => {
  localStorage.setItem('token', token);
  return {
    type: LOGIN,
    payload: token
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  return {
    type: LOGOUT,
    payload: null
  };
};
