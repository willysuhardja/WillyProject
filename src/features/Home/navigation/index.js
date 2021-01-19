import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../../../screens/Home';
import screenNames from './screenNames';
import NavHeader from '../../../components/NavHeader';

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  return (
    <Navigator
      screenOptions={{
        header: NavHeader,
      }}>
      <Screen
        options={{
          title: 'YM Stock',
        }}
        name={screenNames.index}
        component={HomeScreen}
      />
    </Navigator>
  );
};

export default MainStack;
