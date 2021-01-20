import {combineReducers} from 'redux';

import authReducer from './../features/Auth/redux/reducer';
import accountReducer from '../features/AccoutManagement/redux/reducer';
import countReducer from '../features/Count/redux/reducer';
import homeReducer from '../features/Home/redux/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  count: countReducer,
  home: homeReducer,
});

export default appReducer;
