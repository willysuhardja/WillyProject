import {connect} from 'react-redux';
import {doGetLocations} from '../../features/Scan/redux/actions';
import {getLoading, getLocations} from '../../features/Scan/redux/getters';

import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    locationLoading: getLoading(state, 'getLocations'),
    locations: getLocations(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetLocations: () => dispatch(doGetLocations()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const HomeScreen = connectRedux(Screen);

export default HomeScreen;
