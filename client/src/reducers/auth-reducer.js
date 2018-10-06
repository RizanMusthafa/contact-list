import { LOGIN } from '../actions/types';

const intialState = {
  token: null,
  user: null
};

export default (state = intialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { token: action.payload, user: null };
    default:
      return state;
  }
};
