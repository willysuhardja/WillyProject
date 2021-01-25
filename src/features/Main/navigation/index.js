import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import MainDrawerNavigation from './drawer';
import AccountStack from '../../AccoutManagement/navigation';
import {useSelector} from 'react-redux';
import {getBranch} from '../../Auth/redux/getters';

import checkRequests from '../../../hoc/CheckRequest';
import CountStack from '../../Count/navigation';
import ScannStack from '../../Scan/navigation';
import UploadStack from '../../Location/navigation';
import VerificationStack from '../../Verification/navigation';
import IdentityStack from '../../Identification/navigation';

const {Navigator, Screen} = createStackNavigator();

const MainStack = () => {
  const branch = useSelector(getBranch);

  return (
    <Navigator
      initialRouteName={!branch ? screenNames.account : screenNames.home}>
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
        name={screenNames.account}
        component={AccountStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.count}
        component={CountStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.scan}
        component={ScannStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.upload}
        component={UploadStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.verification}
        component={VerificationStack}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.identification}
        component={IdentityStack}
      />
    </Navigator>
  );
};

export default checkRequests(MainStack);
