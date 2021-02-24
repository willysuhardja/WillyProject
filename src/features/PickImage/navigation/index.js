import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import AccountMenuScreen from '../../../screens/AccountMenu';
import screenNames from './screenNames';
import NavHeader from '../../../components/NavHeader';

const {Navigator, Screen} = createStackNavigator();

const AccountMenuStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerTintColor: 'white',
      }}>
      <Screen
        options={{
          header: NavHeader,
          title: 'Account',
        }}
        name={screenNames.index}
        component={AccountMenuScreen}
      />
    </Navigator>
  );
};

export default AccountMenuStack;
