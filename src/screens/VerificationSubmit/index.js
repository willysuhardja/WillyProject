import {connect} from 'react-redux';
import {
  doCheckVerifications,
  doVerification,
} from '../../features/Verification/redux/actions';
import {
  getCheckVerifications,
  getLoading,
} from '../../features/Verification/redux/getters';

import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    checkLoading: getLoading(state, 'checkVerification'),
    verificationLoading: getLoading(state, 'verification'),
    checkVerifications: getCheckVerifications(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doCheckVerifications: (locationName) =>
      dispatch(doCheckVerifications(locationName)),
    doVerification: (locationName, data) =>
      dispatch(doVerification(locationName, data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const VerificationSubmitScreen = connectRedux(Screen);

export default VerificationSubmitScreen;
