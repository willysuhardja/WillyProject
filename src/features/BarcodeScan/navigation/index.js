import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';

import ScanIdentityScreen from '../../../screens/ScanIdentity';
import {SCAN_RETURN_BARCODE} from '../../../constant';
import ItemIdentityScreen from '../../../screens/ItemIdentity';

const {Navigator, Screen} = createStackNavigator();

const IdentityStack = () => {
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
          title: 'Identity Scanner',
        }}
        initialParams={{
          mode: SCAN_RETURN_BARCODE,
          redirect: screenNames.identity,
          barcodeTypes: null,
          barcodeTypesIgnore: ['QR_CODE'],
        }}
        name={screenNames.scanner}
        component={ScanIdentityScreen}
      />
      <Screen
        options={{
          title: 'Identity Product',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.identity}
        component={ItemIdentityScreen}
      />
    </Navigator>
  );
};

export default IdentityStack;
