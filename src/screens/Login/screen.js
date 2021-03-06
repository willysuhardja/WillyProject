import React from 'react';
import {View, ScrollView, Alert} from 'react-native';
import {Text} from 'react-native-paper';
import {
  AppContainer,
  AppLogo,
  AppHeaderText,
  AppTextLink,
} from '../../components';
import config from '../../config';
import screenNames from '../../features/Auth/navigation/screenNames';
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

  const _onLinkToRegister = () => {
    navigation.navigate(screenNames.register);
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{minHeight: '100%'}}>
      <View>
        <View style={styles.logoWrapper}>
          <AppLogo type="logo2" imageStyle={styles.logo} />
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
          <Text style={{textAlign: 'center'}}>
            Belum punya akun?&nbsp;
            <AppTextLink onPress={_onLinkToRegister}>register</AppTextLink>
          </Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <AppTextLink>Version {config.appVersion}</AppTextLink>
        </View>
      </AppContainer>
    </ScrollView>
  );
};

export default LoginScreen;
