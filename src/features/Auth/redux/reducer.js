import * as actionTypes from './constant';
import {initialState} from './state';

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USER_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case actionTypes.LOGIN_PENDING:
      return {
        ...state,
        loginLoading: true,
        loginSuccess: false,
        loginError: false,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: true,
        loginError: false,
      };
    case actionTypes.LOGIN_FAILED:
      return {
        ...state,
        loginLoading: false,
        loginSuccess: false,
        loginError: true,
      };
    case actionTypes.SET_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };
    case actionTypes.GET_BRANCHES_PENDING:
      return {
        ...state,
        getBranchesLoading: true,
        getBranchesSuccess: false,
        getBranchesError: false,
      };
    case actionTypes.GET_BRANCHES_SUCCESS:
      return {
        ...state,
        getBranchesLoading: false,
        getBranchesSuccess: true,
        branchesList: action.payload,
        getBranchesError: false,
      };
    case actionTypes.GET_BRANCHES_FAILED:
      return {
        ...state,
        getBranchesLoading: false,
        getBranchesSuccess: false,
        getBranchesError: true,
      };
    default:
      return state;
  }
}
