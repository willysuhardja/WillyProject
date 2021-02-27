import * as actionTypes from './constant';
import {initialState} from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_MENU_PENDING:
      return {
        ...state,
        menuLoading: true,
        menuSuccess: false,
        menuError: false,
      };
    case actionTypes.GET_MENU_SUCCESS:
      return {
        ...state,
        menuLoading: false,
        menuSuccess: true,
        menuError: false,
        menu: action.payload,
      };
    case actionTypes.GET_MENU_FAILED:
      return {
        ...state,
        menuLoading: false,
        menuSuccess: false,
        menuError: true,
      };
    default:
      return state;
  }
}
