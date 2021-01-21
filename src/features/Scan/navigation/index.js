import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RNCamera} from 'react-native-camera';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import InputQtyScreen from '../../../screens/InputQty';
import ScanLocationScreen from '../../../screens/ScanLocation';
import ScanItemScreen from '../../../screens/ScanItem';

import {SCAN_RETURN_BARCODE} from '../../../constant';

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
        options={({route}) => ({
          title: `Scan Item, Loc: ${route.params.barcode}`,
        })}
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
          title: 'Input Qty',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.inputQty}
        component={InputQtyScreen}
      />
    </Navigator>
  );
};

export default ScannStack;
