import {combineReducers} from 'redux';

import authReducer from './../features/Auth/redux/reducer';
import accountReducer from '../features/AccoutManagement/redux/reducer';
import countReducer from '../features/Count/redux/reducer';
import scanReducer from '../features/Scan/redux/reducer';
import homeReducer from '../features/Home/redux/reducer';
import locationReducer from '../features/Location/redux/reducer';
import verificationReducer from '../features/Verification/redux/reducer';
import identificationReducer from '../features/Identification/redux/reducer';

const appReducer = combineReducers({
  auth: authReducer,
  account: accountReducer,
  count: countReducer,
  scan: scanReducer,
  home: homeReducer,
  location: locationReducer,
  verification: verificationReducer,
  identification: identificationReducer,
});

export default appReducer;
