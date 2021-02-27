import * as actionTypes from './constant';
import {initialState} from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.CREATE_NOTE_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case actionTypes.CREATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
      };
    case actionTypes.CREATE_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
      };
    case actionTypes.UPDATE_NOTE_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case actionTypes.UPDATE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
      };
    case actionTypes.UPDATE_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
      };
    case actionTypes.DELETE_NOTE_PENDING:
      return {
        ...state,
        loading: true,
        errorMessage: '',
      };
    case actionTypes.DELETE_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: '',
      };
    case actionTypes.DELETE_NOTE_FAILED:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload.message,
      };
    default:
      return state;
  }
}
