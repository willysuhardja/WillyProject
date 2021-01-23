import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import VerificationListScreen from '../../../screens/VerificationList';

const {Navigator, Screen} = createStackNavigator();

const VerificationStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: DefaultTheme.colors.white,
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
      }}>
      <Screen
        options={{
          title: 'Verification List',
        }}
        name={screenNames.verification}
        component={VerificationListScreen}
      />
    </Navigator>
  );
};

export default VerificationStack;
