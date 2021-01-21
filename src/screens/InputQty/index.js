import {connect} from 'react-redux';
import {
  doVerifyScanItem,
  doAddScanItem,
} from '../../features/Scan/redux/actions';
import {
  getLoading,
  getLocation,
  getProductDetail,
} from '../../features/Scan/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    productLoading: getLoading(state, 'productDetail'),
    addScanLoading: getLoading(state, 'addScanItem'),
    productDetail: getProductDetail(state),
    location: getLocation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doVerifyScanItem: (barcode) => dispatch(doVerifyScanItem(barcode)),
    doAddScanItem: (data) => dispatch(doAddScanItem(data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const InputQtyScreen = connectRedux(Screen);

export default InputQtyScreen;
