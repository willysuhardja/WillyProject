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
    carouselData: [
      {
        image_url:
          'https://www.titechglobal.com/wp-content/uploads/2018/08/react-native-banner.jpg',
      },
      {
        image_url:
          'https://www.linkites.com/wp-content/uploads/2019/04/React-native-Banner.png',
      },
      {
        image_url: 'https://miro.medium.com/max/3675/0*cokvfB_F91juLMEj.jpeg',
      },
      {
        image_url:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5v8_WIf4FakUS0HZYVyCqXUPsXhqKeaxFMA&usqp=CAU',
      },
    ],
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
