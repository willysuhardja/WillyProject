import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScannerScreen from '../../../screens/Scanner';
import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import {SCAN_RETURN_BARCODE} from '../../../constant';
import LocationTimerScreen from '../../../screens/LocationTimer';
import {RNCamera} from 'react-native-camera';

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
          barcodeTypesIgnore: null,
        }}
        name={screenNames.location}
        component={ScannerScreen}
      />
      <Screen
        options={{
          title: 'Scan Item',
        }}
        initialParams={{
          mode: SCAN_RETURN_BARCODE,
          redirect: screenNames.inputQty,
          barcodeTypes: null,
          barcodeTypesIgnore: [
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE,
          ],
        }}
        name={screenNames.item}
        component={ScannerScreen}
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
