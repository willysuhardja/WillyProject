import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';

import BluetoothPrintSettingScreen from './../../../screens/BluetoothPrintSettings';

const {Navigator, Screen} = createStackNavigator();

const BluetoothPrintStack = () => {
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
          title: 'Bluetooth Printer',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.settings}
        component={BluetoothPrintSettingScreen}
      />
    </Navigator>
  );
};

export default BluetoothPrintStack;
