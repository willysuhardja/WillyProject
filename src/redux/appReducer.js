import {combineReducers} from 'redux';

import authReducer from './../features/Auth/redux/reducer';
import accountReducer from '../features/AccoutManagement/redux/reducer';
import homeReducer from '../features/Home/redux/reducer';
import identificationReducer from '../features/BarcodeScan/redux/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  home: homeReducer,
  identification: identificationReducer,
});

export default appReducer;
