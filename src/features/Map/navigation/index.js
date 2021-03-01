import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import MapScreen from '../../../screens/Maps';

const {Navigator, Screen} = createStackNavigator();

const MapStack = () => {
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
          title: 'Maps',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.mapView}
        component={MapScreen}
      />
    </Navigator>
  );
};

export default MapStack;
