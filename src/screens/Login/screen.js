import * as React from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {
  AppContainer,
  AppLogo,
  AppHeaderText,
  AppTextLink,
} from '../../components';
import config from '../../config';
import {DefaultTheme} from '../../theme';
import LoginForm from './components/LoginForm';
import {styles} from './styles';

const LoginScreen = ({doLogin, loading, navigation}) => {
  const _onSubmit = ({username, password}) => {
    doLogin(username, password)
      .then(() => {})
      .catch((error) => {
        Alert.alert('Login Failed', error.message);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{minHeight: '100%'}}>
      <View>
        <View style={styles.logoWrapper}>
          <AppLogo type="logo2" imageStyle={styles.logo} size="lg" />
        </View>
      </View>
      <AppContainer
        containerStyle={{
          backgroundColor: DefaultTheme.colors.surface,
          marginTop: 10,
          justifyContent: 'space-between',
        }}>
        <View style={{width: '100%'}}>
          <AppHeaderText>Welcome back.</AppHeaderText>
          <LoginForm onSubmit={_onSubmit} loading={loading} />
        </View>
        <View style={{alignItems: 'center'}}>
          <AppTextLink>Version {config.appVersion}</AppTextLink>
        </View>
      </AppContainer>
    </ScrollView>
  );
};

export default LoginScreen;
