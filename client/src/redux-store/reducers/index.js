import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import contactReducer from './contacts-reducer';

export default combineReducers({
  auth: authReducer,
  contacts: contactReducer
});
