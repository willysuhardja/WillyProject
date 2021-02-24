import {connect} from 'react-redux';
import {doGetProductIdentity} from '../../features/BarcodeScan/redux/actions';
import {
  getLoading,
  getProductDetail,
  getProductIdentification,
} from '../../features/BarcodeScan/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    productLoading: getLoading(state, 'productDetail'),
    productDetail: getProductDetail(state),
    productIdentification: getProductIdentification(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetProductIdentity: (barcode) => dispatch(doGetProductIdentity(barcode)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const ItemIdentityScreen = connectRedux(Screen);

export default ItemIdentityScreen;
