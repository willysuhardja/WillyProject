import {connect} from 'react-redux';
import {
  doUpdateProfile,
  fetchUserProfile,
} from '../../features/AccoutManagement/redux/actions';
import {
  getLoading,
  getProfile,
} from '../../features/AccoutManagement/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    profileLoading: getLoading(state, 'profile'),
    updateLoading: getLoading(state, 'updateProfile'),
    profile: getProfile(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    doUpdateProfile: (data) => dispatch(doUpdateProfile(data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const UpdateProfileScreen = connectRedux(Screen);

export default UpdateProfileScreen;
