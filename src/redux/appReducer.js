import {combineReducers} from 'redux';

import authReducer from './../features/Auth/redux/reducer';
import accountReducer from '../features/AccoutManagement/redux/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
});

export default appReducer;
