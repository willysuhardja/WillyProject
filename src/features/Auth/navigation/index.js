import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {useSelector} from 'react-redux';
import {getGoldApi, getMainApi} from '../redux/getters';

import LoginScreen from '../../../screens/Login';
import RegisterScreen from '../../../screens/Register';

import screenNames from './screenNames';

const {Navigator, Screen} = createStackNavigator();

const AuthStack = () => {
  const mainAPi = useSelector(getMainApi);
  const goldApi = useSelector(getGoldApi);

  const isValidEnv = mainAPi !== null && goldApi !== null;

  return (
    <Navigator
      initialRouteName={isValidEnv ? screenNames.login : screenNames.chooseEnv}
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={screenNames.login} component={LoginScreen} />
      <Screen name={screenNames.register} component={RegisterScreen} />
    </Navigator>
  );
};

export default AuthStack;
