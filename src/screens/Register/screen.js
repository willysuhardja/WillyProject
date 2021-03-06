import React, {useState} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

import {
  AppContainer,
  AppHeaderText,
  AppLogo,
  AppTextLink,
} from '../../components';

import RegisterForm from './components/RegisterForm';

import screenNames from '../../features/Auth/navigation/screenNames';
import {DefaultTheme} from '../../theme';

import {axiosIntance} from './../../utils/axios';

export default function Screen({navigation}) {
  const [loading, setLoading] = useState(false);
  const _onSubmit = ({name, email, password, gender}) => {
    setLoading(true);
    axiosIntance
      .post('https://reqres.in/api/register', {
        email,
        password,
      })
      .then(() => {
        Alert.alert('Login Success');
      })
      .catch(() => {
        Alert.alert('Failed');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const _onLinkLogin = () => {
    navigation.navigate(screenNames.login);
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
          <AppHeaderText>Register Akun Baru.</AppHeaderText>
          <RegisterForm onSubmit={_onSubmit} loading={loading} />
          <Text style={{textAlign: 'center'}}>
            Sudah punya akun?&nbsp;
            <AppTextLink onPress={_onLinkLogin}>login</AppTextLink>
          </Text>
        </View>
      </AppContainer>
    </ScrollView>
  );
}

export const styles = {
  logoWrapper: {
    padding: 20,
    width: '100%',
  },
  logo: {
    alignSelf: 'flex-start',
    width: 175,
    height: 175,
  },
};
