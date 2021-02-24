import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import PickImageScreen from '../../../screens/PickImage';

const {Navigator, Screen} = createStackNavigator();

const PickImageStack = () => {
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
        options={{title: 'Pick Image'}}
        name={screenNames.home}
        component={PickImageScreen}
      />
    </Navigator>
  );
};

export default PickImageStack;
