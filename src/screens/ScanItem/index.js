import {connect} from 'react-redux';
import {doVerifyLocation} from '../../features/Scan/redux/actions';
import {getLoading, getError} from '../../features/Scan/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    verificationLoading: getLoading(state, 'verification'),
    verificationError: getError(state, 'verification'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doVerifyLocation: (location) =>
      dispatch(doVerifyLocation(location, 'scan')),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);
const ScanItemScreen = connectRedux(Screen);

export default ScanItemScreen;
