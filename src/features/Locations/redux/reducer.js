import * as actionTypes from './constant';
import {initialState} from './state';

export default function scanReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LOCATION_LIST_PENDING:
      return {
        ...state,
        getLocationsLoading: true,
        getLocationsSuccess: false,
        getLocationsError: false,
      };
    case actionTypes.GET_LOCATION_LIST_SUCCESS:
      return {
        ...state,
        getLocationsLoading: false,
        getLocationsSuccess: true,
        getLocationsError: false,
        locations: action.payload,
      };
    case actionTypes.GET_LOCATION_LIST_FAILED:
      return {
        ...state,
        getLocationsLoading: false,
        getLocationsSuccess: false,
        getLocationsError: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
