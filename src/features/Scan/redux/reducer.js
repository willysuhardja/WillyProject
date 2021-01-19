import * as actionTypes from './constant';
import {initialState} from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case actionTypes.SET_END_DURATION:
      return {
        ...state,
        endDuration: action.payload,
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
