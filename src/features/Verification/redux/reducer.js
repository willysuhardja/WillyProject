import * as actionTypes from './constant';
import {initialState} from './state';

export default function verificationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VERIFICATION_LIST_PENDING:
      return {
        ...state,
        getVerificationsLoading: true,
        getVerificationsSuccess: false,
        getVerificationsError: false,
      };
    case actionTypes.GET_VERIFICATION_LIST_SUCCESS:
      const formatedVerifications = action.payload.map((location) => {
        const {status_counter, status_1, status} = location;

        const statusText = !status_counter
          ? 'Belum dihitung'
          : !status_1
          ? 'Belum diupload'
          : status === 2
          ? 'Sudah verifikasi'
          : 'Belum verifikasi';
        return {
          ...location,
          status: statusText,
        };
      });

      return {
        ...state,
        getVerificationsLoading: false,
        getVerificationsSuccess: true,
        getVerificationsError: false,
        verifications: formatedVerifications,
      };
    case actionTypes.GET_VERIFICATION_LIST_FAILED:
      return {
        ...state,
        getVerificationsLoading: false,
        getVerificationsSuccess: false,
        getVerificationsError: true,
        verifications: [],
      };
    case actionTypes.CHECK_VERIFICATION_PENDING:
      return {
        ...state,
        checkVerificationLoading: true,
        checkVerificationSuccess: false,
        checkVerificationError: false,
      };
    case actionTypes.CHECK_VERIFICATION_SUCCESS:
      return {
        ...state,
        checkVerificationLoading: false,
        checkVerificationSuccess: true,
        checkVerificationError: false,
        checkVerifications: action.payload,
      };
    case actionTypes.CHECK_VERIFICATION_FAILED:
      return {
        ...state,
        checkVerificationLoading: false,
        checkVerificationSuccess: false,
        checkVerificationError: true,
        checkVerifications: [],
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
        checkVerifications: [],
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
