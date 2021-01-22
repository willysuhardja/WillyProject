import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';

import LocationListScreen from '../../../screens/LocationList';
import LocationListDetailScreen from '../../../screens/LocationListDetail';

const {Navigator, Screen} = createStackNavigator();

const UploadStack = () => {
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
          title: 'Location List',
        }}
        name={screenNames.location}
        component={LocationListScreen}
      />
      <Screen
        options={({route}) => ({
          title: `Detail, Loc: ${route.params.name}`,
        })}
        name={screenNames.detail}
        component={LocationListDetailScreen}
      />
    </Navigator>
  );
};

export default UploadStack;
