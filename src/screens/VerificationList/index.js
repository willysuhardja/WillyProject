import {connect} from 'react-redux';
import {doGetVerifications} from '../../features/Verification/redux/actions';
import {
  getLoading,
  getVerifications,
} from '../../features/Verification/redux/getters';

import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state, 'getVerifications'),
    verifications: getVerifications(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetVerifications: () => dispatch(doGetVerifications()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const VerificationListScreen = connectRedux(Screen);

export default VerificationListScreen;
