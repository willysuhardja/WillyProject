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
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
