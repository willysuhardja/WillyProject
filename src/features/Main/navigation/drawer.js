import React, {Fragment} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import HomeStack from '../../Home/navigation';
import AccountStack from '../../AccountMenu/navigation';
import {default as homeScreenNames} from '../../Home/navigation/screenNames';
import {default as accountScreenNames} from '../../AccountMenu/navigation/screenNames';

const {Navigator, Screen} = createDrawerNavigator();

const MainDrawerNavigation = () => {
  return (
    <Navigator initialRouteName={'Home'}>
      <Screen
        name={homeScreenNames.index}
        component={HomeStack}
        options={{
          title: 'Home',
          tabBarIcon: 'home',
        }}
      />
      <Screen
        name={accountScreenNames.index}
        component={AccountStack}
        options={{
          title: 'Me',
          tabBarIcon: 'account',
        }}
      />
    </Navigator>
  );
};

export default MainDrawerNavigation;
