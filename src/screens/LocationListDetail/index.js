import {connect} from 'react-redux';
import {doGetLocations} from '../../features/Location/redux/actions';
import {getLoading, getLocations} from '../../features/Location/redux/getters';

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

const LocationListDetailScreen = connectRedux(Screen);

export default LocationListDetailScreen;
