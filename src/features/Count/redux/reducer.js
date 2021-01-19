import * as actionTypes from './constant';
import {initialState} from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case actionTypes.SET_END_TIME:
      const duration = actionTypes - state.startTime;

      return {
        ...state,
        endTime: action.payload,
        duration,
      };
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case actionTypes.SET_CANCEL_COUNT:
      return initialState;
    default:
      return state;
  }
}
