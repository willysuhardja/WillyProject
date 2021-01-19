import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import UpdateProfileScreen from '../../../screens/UpdateProfile';
import ChangePasswordScreen from '../../../screens/ChangePassword';
import {DefaultTheme} from '../../../theme';
import ChooseBranchScreen from '../../../screens/ChooseBranch';
import {useSelector} from 'react-redux';
import {getBranch} from '../../Auth/redux/getters';

const {Navigator, Screen} = createStackNavigator();

const AccountStack = () => {
  const branch = useSelector(getBranch);
  return (
    <Navigator
      screenOptions={{
        headerShown: true,
        headerTintColor: DefaultTheme.colors.white,
        headerStyle: {
          backgroundColor: DefaultTheme.colors.primary,
        },
      }}
      initialRouteName={
        !branch ? screenNames.chooseStore : screenNames.updateProfile
      }>
      <Screen
        options={{
          title: 'Update Profile',
        }}
        name={screenNames.updateProfile}
        component={UpdateProfileScreen}
      />
      <Screen
        options={{
          title: 'Change Password',
        }}
        name={screenNames.changePassword}
        component={ChangePasswordScreen}
      />
      <Screen
        options={{
          headerShown: false,
        }}
        name={screenNames.chooseStore}
        component={ChooseBranchScreen}
      />
    </Navigator>
  );
};

export default AccountStack;
