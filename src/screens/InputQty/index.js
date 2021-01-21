import {connect} from 'react-redux';
import {doGetProductIdentity} from '../../features/Scan/redux/actions';
import {getLoading, getProductDetail} from '../../features/Scan/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    productLoading: getLoading(state, 'productDetail'),
    productDetail: getProductDetail(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetProductDetail: (barcode) => dispatch(doGetProductIdentity(barcode)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const InputQtyScreen = connectRedux(Screen);

export default InputQtyScreen;
