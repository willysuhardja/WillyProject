import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import {SCAN_RETURN_BARCODE} from '../../../constant';
import LocationTimerScreen from '../../../screens/LocationTimer';
import {RNCamera} from 'react-native-camera';
import ScanLocationScreen from '../../../screens/ScanLocation';
import ScanItemScreen from '../../../screens/ScanItem';

const {Navigator, Screen} = createStackNavigator();

const ScannStack = () => {
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
          title: 'Scan Location',
        }}
        initialParams={{
          mode: SCAN_RETURN_BARCODE,
          redirect: screenNames.item,
          barcodeTypes: [
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE,
          ],
          barcodeTypesIgnore: [],
        }}
        name={screenNames.location}
        component={ScanLocationScreen}
      />
      <Screen
        options={{
          title: 'Scan Item',
        }}
        initialParams={{
          mode: SCAN_RETURN_BARCODE,
          redirect: screenNames.inputQty,
          barcodeTypes: null,
          barcodeTypesIgnore: ['QR_CODE'],
        }}
        name={screenNames.item}
        component={ScanItemScreen}
      />
      <Screen
        options={{
          title: 'Location Timer',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.inputQty}
        component={LocationTimerScreen}
      />
    </Navigator>
  );
};

export default ScannStack;
