import React from 'react';
import {StatusBar} from 'react-native';
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

const App = () => {
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
