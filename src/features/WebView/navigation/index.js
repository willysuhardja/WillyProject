import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import screenNames from './screenNames';
import {DefaultTheme} from '../../../theme';
import WebViewScreen from '../../../screens/WebView';
import WebViewHomeScreen from '../../../screens/WebViewHome';

const {Navigator, Screen} = createStackNavigator();

const WebViewStack = () => {
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
        options={{title: 'Web View'}}
        name={screenNames.home}
        component={WebViewHomeScreen}
      />
      <Screen
        options={({
          route: {
            params: {title},
          },
        }) => ({title})}
        initialParams={{
          title: 'Webview',
          url: 'https://yogyagroup.com/',
        }}
        name={screenNames.webview}
        component={WebViewScreen}
      />
    </Navigator>
  );
};

export default WebViewStack;
