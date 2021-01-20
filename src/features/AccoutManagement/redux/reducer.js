import * as actionTypes from './constant';
import {initialState} from './state';

export default function accountReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_PROFILE:
      const profile = action.payload;
      return {
        ...state,
        profile: {
          ...profile,
        },
      };
    case actionTypes.PROFILE_PENDING:
      return {
        ...state,
        profileLoading: true,
        profileSuccess: false,
        profileError: false,
      };
    case actionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        profileLoading: false,
        profileSuccess: true,
        profileError: false,
      };
    case actionTypes.PROFILE_FAILED:
      return {
        ...state,
        profileLoading: false,
        profileSuccess: false,
        profileError: true,
      };
    case actionTypes.CHANGE_PASSWORD_PENDING:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordSuccess: false,
        changePasswordError: false,
      };
    case actionTypes.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: true,
        changePasswordError: false,
      };
    case actionTypes.CHANGE_PASSWORD_FAILED:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordSuccess: false,
        changePasswordError: true,
      };
    case actionTypes.UPDATE_PROFILE_PENDING:
      return {
        ...state,
        updateProfileLoading: true,
        updateProfileSuccess: false,
        updateProfileError: false,
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: true,
        updateProfileError: false,
      };
    case actionTypes.UPDATE_PROFILE_FAILED:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileSuccess: false,
        updateProfileError: true,
      };
    default:
      return state;
  }
}
