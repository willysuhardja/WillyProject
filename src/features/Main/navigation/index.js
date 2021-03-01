import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import MainDrawerNavigation from './drawer';
import MainBottomTabsNavigation from './bottomtabs';
import AccountStack from '../../AccoutManagement/navigation';
import {useSelector} from 'react-redux';
import {getBranch} from '../../Auth/redux/getters';

import checkRequests from '../../../hoc/CheckRequest';
import IdentityStack from '../../BarcodeScan/navigation';
import BluetoothPrintStack from '../../BluetoothPrinter/navigation';
import PickImageStack from '../../PickImage/navigation';
import WebViewStack from '../../WebView/navigation';
import NoteStack from '../../Note/navigation';
import MapStack from '../../Map/navigation';

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  const branch = useSelector(getBranch);

  return (
    <Navigator
      initialRouteName={!branch ? screenNames.account : screenNames.homeTab}>
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.home}
        component={MainDrawerNavigation}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.homeTab}
        component={MainBottomTabsNavigation}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.account}
        component={AccountStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.identification}
        component={IdentityStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.bluetoothPrint}
        component={BluetoothPrintStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.pickImage}
        component={PickImageStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.webview}
        component={WebViewStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.note}
        component={NoteStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.map}
        component={MapStack}
      />
    </Navigator>
  );
};

export default checkRequests(MainStack);
