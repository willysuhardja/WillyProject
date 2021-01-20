import {connect} from 'react-redux';
import {fetchUserProfile} from '../../features/AccoutManagement/redux/actions';
import {
  getLoading,
  getProfile,
} from '../../features/AccoutManagement/redux/getters';

import {getBranch} from '../../features/Auth/redux/getters';
import {doGetMenu} from '../../features/Home/redux/actions';
import {
  getMenu,
  getLoading as getHomeLoading,
} from '../../features/Home/redux/getters';

import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    profileLoading: getLoading(state, 'profile'),
    profile: getProfile(state),
    branch: getBranch(state),
    menu: getMenu(state),
    menuLoading: getHomeLoading(state, 'menu'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    doGetMenu: () => dispatch(doGetMenu()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const HomeScreen = connectRedux(Screen);

export default HomeScreen;
