import * as actionTypes from './constant';
import {initialState} from './state';

export default function locationReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_LOCATION_LIST_PENDING:
      return {
        ...state,
        getLocationsLoading: true,
        getLocationsSuccess: false,
        getLocationsError: false,
      };
    case actionTypes.GET_LOCATION_LIST_SUCCESS:
      const formatedLocations = action.payload.map((location) => {
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
        getLocationsLoading: false,
        getLocationsSuccess: true,
        getLocationsError: false,
        locations: formatedLocations,
      };
    case actionTypes.GET_LOCATION_LIST_FAILED:
      return {
        ...state,
        getLocationsLoading: false,
        getLocationsSuccess: false,
        getLocationsError: true,
        locations: [],
      };
    case actionTypes.GET_LOCATION_DETAILS_PENDING:
      return {
        ...state,
        getLocationDetailsLoading: true,
        getLocationDetailsSuccess: false,
        getLocationDetailsError: false,
      };
    case actionTypes.GET_LOCATION_DETAILS_SUCCESS:
      return {
        ...state,
        getLocationDetailsLoading: false,
        getLocationDetailsSuccess: true,
        getLocationDetailsError: false,
        locationDetails: action.payload,
      };
    case actionTypes.GET_LOCATION_DETAILS_FAILED:
      return {
        ...state,
        getLocationDetailsLoading: false,
        getLocationDetailsSuccess: false,
        getLocationDetailsError: true,
        locationDetails: [],
      };
    case actionTypes.UPDATE_ITEM_QTY_PENDING:
      return {
        ...state,
        updateItemsLoading: true,
        updateItemsSuccess: false,
        updateItemsError: false,
      };
    case actionTypes.UPDATE_ITEM_QTY_SUCCESS:
      return {
        ...state,
        updateItemsLoading: false,
        updateItemsSuccess: true,
        updateItemsError: false,
      };
    case actionTypes.UPDATE_ITEM_QTY_FAILED:
      return {
        ...state,
        updateItemsLoading: false,
        updateItemsSuccess: false,
        updateItemsError: true,
      };
    case actionTypes.UPLOAD_LOCATION_PENDING:
      return {
        ...state,
        uploadLocationLoading: true,
        uploadLocationSuccess: false,
        uploadLocationError: false,
      };
    case actionTypes.UPLOAD_LOCATION_SUCCESS:
      return {
        ...state,
        uploadLocationLoading: false,
        uploadLocationSuccess: true,
        uploadLocationError: false,
      };
    case actionTypes.UPLOAD_LOCATION_FAILED:
      return {
        ...state,
        uploadLocationLoading: false,
        uploadLocationSuccess: false,
        uploadLocationError: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
