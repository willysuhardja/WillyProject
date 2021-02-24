import {connect} from 'react-redux';
import {fetchUserProfile} from '../../features/AccoutManagement/redux/actions';
import {
  getLoading,
  getProfile,
} from '../../features/AccoutManagement/redux/getters';

import {getBranch} from '../../features/Auth/redux/getters';

import menu from '../../data/menu';

import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    profileLoading: getLoading(state, 'profile'),
    profile: getProfile(state),
    branch: getBranch(state),
    menu: menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    doGetMenu: () => {},
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const HomeScreen = connectRedux(Screen);

export default HomeScreen;
