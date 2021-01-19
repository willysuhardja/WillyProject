import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import MainDrawerNavigation from './drawer';
import AccountStack from '../../AccoutManagement/navigation';
import {useSelector} from 'react-redux';
import {getBranch} from '../../Auth/redux/getters';

import checkRequests from '../../../hoc/CheckRequest';
import CountStack from '../../Count/navigation';

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  const branch = useSelector(getBranch);

  return (
    <Navigator
      initialRouteName={!branch ? screenNames.account : screenNames.home}>
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.home}
        component={MainDrawerNavigation}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.account}
        component={AccountStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.count}
        component={CountStack}
      />
    </Navigator>
  );
};

export default checkRequests(MainStack);
