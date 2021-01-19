import {connect} from 'react-redux';
import {fetchUserProfile} from '../../features/AccoutManagement/redux/actions';
import {setBranch, setUserToken} from '../../features/Auth/redux/actions';
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
    setUserToken: () => dispatch(setUserToken(null)),
    setBranch: () => dispatch(setBranch(null)),
    fetchUserProfile: () => dispatch(fetchUserProfile()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const AccountMenuScreen = connectRedux(Screen);

export default AccountMenuScreen;
