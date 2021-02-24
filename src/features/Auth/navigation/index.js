import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../../../screens/Login';
import screenNames from './screenNames';
import {useSelector} from 'react-redux';
import {getGoldApi, getMainApi} from '../redux/getters';

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
    </Navigator>
  );
};

export default AuthStack;
