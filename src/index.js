import React, {useEffect} from 'react';
import {DeviceEventEmitter, StatusBar} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider as StoreProvider} from 'react-redux';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import {Provider as PaperProvider} from 'react-native-paper';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigation from './navigation/AppNavigation';
import {DefaultTheme, NavigationTheme} from './theme';
import {persistor, store} from './redux/store';
import {AppLoadingBasic} from './components';
import CodePushProvider from './providers/CodePush';
import database from './database';

import {BluetoothManager} from 'react-native-bluetooth-escpos-printer';
import {setBluetoothPaired} from './features/BluetoothPrinter/redux/actions';

const App = () => {
  useEffect(() => {
    DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_CONNECTION_LOST,
      onConnectionLost,
    );
    DeviceEventEmitter.addListener(
      BluetoothManager.EVENT_UNABLE_CONNECT,
      onDeviceUnableConnect,
    );

    () => {
      DeviceEventEmitter.removeListener(
        BluetoothManager.EVENT_CONNECTION_LOST,
        onConnectionLost,
      );
      DeviceEventEmitter.removeListener(
        BluetoothManager.EVENT_UNABLE_CONNECT,
        onDeviceUnableConnect,
      );
    };
  }, []);
  const onConnectionLost = () => {
    store.dispatch(setBluetoothPaired(null));
  };

  const onDeviceUnableConnect = () => {
    store.dispatch(setBluetoothPaired(null));
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={DefaultTheme.colors.primary}
      />
      <CodePushProvider>
        <StoreProvider store={store}>
          <PersistGate loading={<AppLoadingBasic />} persistor={persistor}>
            <DatabaseProvider database={database}>
              <PaperProvider theme={DefaultTheme}>
                <NavigationContainer theme={NavigationTheme}>
                  <AppNavigation />
                </NavigationContainer>
              </PaperProvider>
            </DatabaseProvider>
          </PersistGate>
        </StoreProvider>
      </CodePushProvider>
    </>
  );
};

export default App;
