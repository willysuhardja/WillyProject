import {connect} from 'react-redux';
import {fetchUserProfile} from '../../features/AccoutManagement/redux/actions';
import {
  getLoading,
  getProfile,
} from '../../features/AccoutManagement/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    profileLoading: getLoading(state, 'profile'),
    profile: getProfile(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const HomeScreen = connectRedux(Screen);

export default HomeScreen;
