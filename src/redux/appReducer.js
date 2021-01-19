import {combineReducers} from 'redux';

import authReducer from './../features/Auth/redux/reducer';
import accountReducer from '../features/AccoutManagement/redux/reducer';
import countReducer from '../features/Count/redux/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  count: countReducer,
});

export default appReducer;
