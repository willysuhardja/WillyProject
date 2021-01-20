import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ScannerScreen from '../../../screens/Scanner';
import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import {SCAN_RETURN_BARCODE} from '../../../constant';
import LocationTimerScreen from '../../../screens/LocationTimer';
import {useSelector} from 'react-redux';
import {getLocation} from '../redux/getters';
import {RNCamera} from 'react-native-camera';

const {Navigator, Screen} = createStackNavigator();

const CountStack = () => {
  const currentLocation = useSelector(getLocation);
  return (
    <Navigator
      initialRouteName={currentLocation ? screenNames.timer : screenNames.scan}
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
          redirect: screenNames.timer,
          barcodeTypes: [
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE,
          ],
          barcodeTypesIgnore: null,
        }}
        name={screenNames.scan}
        component={ScannerScreen}
      />
      <Screen
        options={{
          title: 'Location Timer',
        }}
        initialParams={{
          barcode: null,
        }}
        name={screenNames.timer}
        component={LocationTimerScreen}
      />
    </Navigator>
  );
};

export default CountStack;
