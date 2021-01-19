import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../../../screens/Login';
import screenNames from './screenNames';

const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
  return (
    <Navigator
      initialRouteName={screenNames.login}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={screenNames.login} component={LoginScreen} />
    </Navigator>
  );
};

export default AuthStack;
