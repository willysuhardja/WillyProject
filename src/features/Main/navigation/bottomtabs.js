import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from '../../Home/navigation';
import AccountStack from '../../AccountMenu/navigation';
import {default as homeScreenNames} from '../../Home/navigation/screenNames';
import {default as accountScreenNames} from '../../AccountMenu/navigation/screenNames';
import {IconButton} from 'react-native-paper';

const {Navigator, Screen} = createBottomTabNavigator();

const MainBottomTabsNavigation = () => {
  return (
    <Navigator initialRouteName={'HomeTab'}>
      <Screen
        name={homeScreenNames.index}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: ({color}) => <IconButton icon="home" color={color} />,
        }}
      />
      <Screen
        name={accountScreenNames.index}
        component={AccountStack}
        options={{
          title: 'Me',
          tabBarIcon: ({color}) => <IconButton icon="account" color={color} />,
        }}
      />
    </Navigator>
  );
};

export default MainBottomTabsNavigation;
