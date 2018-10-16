import { combineReducers } from 'redux';
import authReducer from './auth-reducer';
import contactReducer from './contacts-reducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  contacts: contactReducer,
  form: formReducer
});
