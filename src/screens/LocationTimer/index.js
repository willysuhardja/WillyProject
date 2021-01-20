import {connect} from 'react-redux';
import {
  setStartTime,
  setEndTime,
  doVerifyLocation,
  doReset,
  doSubmitCount,
} from '../../features/Count/redux/actions';
import {
  getLoading,
  getStartTime,
  getLocation,
  getError,
} from '../../features/Count/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    verificationLoading: getLoading(state, 'verification'),
    verificationError: getError(state, 'verification'),
    submitCountLoading: getLoading(state, 'submitCount'),
    submitCountError: getError(state, 'submitCount'),
    startTime: getStartTime(state),
    location: getLocation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStartTime: (time) => dispatch(setStartTime(time)),
    setEndTime: (time) => dispatch(setEndTime(time)),
    doVerifyLocation: (location) =>
      dispatch(doVerifyLocation(location, 'count')),
    doReset: () => dispatch(doReset()),
    doSubmitCount: () => dispatch(doSubmitCount()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const LocationTimerScreen = connectRedux(Screen);

export default LocationTimerScreen;
