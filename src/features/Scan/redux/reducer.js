import * as actionTypes from './constant';
import {initialState} from './state';

export default function scanReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    case actionTypes.VERIFICATION_PENDING:
      return {
        ...state,
        verificationLoading: true,
        verificationSuccess: false,
        verificationError: false,
      };
    case actionTypes.VERIFICATION_SUCCESS:
      return {
        ...state,
        verificationLoading: false,
        verificationSuccess: true,
        verificationError: false,
      };
    case actionTypes.VERIFICATION_FAILED:
      return {
        ...state,
        verificationLoading: false,
        verificationSuccess: false,
        verificationError: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
