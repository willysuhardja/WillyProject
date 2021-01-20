import * as actionTypes from './constant';
import {initialState} from './state';

import {duration as momentDuration} from 'moment';

const pad = (n) => (n < 10 ? '0' + n : n);

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_START_TIME:
      return {
        ...state,
        startTime: action.payload,
      };
    case actionTypes.SET_END_TIME:
      const duration = momentDuration(action.payload - state.startTime);

      // eslint-disable-next-line prettier/prettier
      const formatedDuration = `${pad(duration.hours())}:${pad(duration.minutes())}:${pad(duration.seconds())}`;

      return {
        ...state,
        endTime: action.payload,
        duration: formatedDuration,
      };
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
    case actionTypes.SUBMIT_COUNT_PENDING:
      return {
        ...state,
        submitCountLoading: true,
        submitCountSuccess: false,
        submitCountError: false,
      };
    case actionTypes.SUBMIT_COUNT_SUCCESS:
      return {
        ...state,
        submitCountLoading: false,
        submitCountSuccess: true,
        submitCountError: false,
      };
    case actionTypes.SUBMIT_COUNT_FAILED:
      return {
        ...state,
        submitCountLoading: false,
        submitCountSuccess: false,
        submitCountError: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
