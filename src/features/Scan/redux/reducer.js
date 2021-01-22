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
    case actionTypes.GET_PRODUCT_DETAIL_PENDING:
      return {
        ...state,
        productDetailLoading: true,
        productDetailSuccess: false,
        productDetailError: false,
      };
    case actionTypes.GET_PRODUCT_DETAIL_SUCCESS:
      const product = action.payload;

      const productDetail = {};
      Object.keys(product).forEach((key) => {
        if (key === 'selling_price' || key === 'avg_price') {
          productDetail[key] = product[key].replace(/ /gi, '');
        } else {
          productDetail[key] = product[key];
        }
      });

      return {
        ...state,
        productDetailLoading: false,
        productDetailSuccess: true,
        productDetailError: false,
        productDetail: productDetail,
      };
    case actionTypes.GET_PRODUCT_DETAIL_FAILED:
      return {
        ...state,
        productDetailLoading: false,
        productDetailSuccess: false,
        productDetailError: true,
        productDetail: initialState.productDetail,
      };
    case actionTypes.ADD_SCAN_ITEM_PENDING:
      return {
        ...state,
        addScanItemLoading: true,
        addScanItemSuccess: false,
        addScanItemError: false,
      };
    case actionTypes.ADD_SCAN_ITEM_SUCCESS:
      return {
        ...state,
        addScanItemLoading: false,
        addScanItemSuccess: true,
        addScanItemError: false,
      };
    case actionTypes.ADD_SCAN_ITEM_FAILED:
      return {
        ...state,
        addScanItemLoading: false,
        addScanItemSuccess: false,
        addScanItemError: true,
      };
    case actionTypes.RESET:
      return initialState;
    default:
      return state;
  }
}
