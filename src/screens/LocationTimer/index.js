import {connect} from 'react-redux';
import {
  setStartTime,
  setEndTime,
  doVerifyLocation,
  doCancelCount,
} from '../../features/Count/redux/actions';
import {
  getLoading,
  getStartTime,
  getLocation,
} from '../../features/Count/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    verificationLoading: getLoading(state, 'verification'),
    startTime: getStartTime(state),
    location: getLocation(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStartTime: (time) => dispatch(setStartTime(time)),
    setEndTime: (time) => dispatch(setEndTime(time)),
    doVerifyLocation: (location) => dispatch(doVerifyLocation(location)),
    doCancelCount: () => dispatch(doCancelCount()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const LocationTimerScreen = connectRedux(Screen);

export default LocationTimerScreen;
