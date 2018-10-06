import { LOGIN } from './types';

export const login = () => {
  return {
    type: LOGIN,
    payload: 'dummy token'
  };
};
