import React from 'react';
import {ScrollView, View} from 'react-native';
import {Text} from 'react-native-paper';

import {
  AppContainer,
  AppHeaderText,
  AppLogo,
  AppTextLink,
} from '../../components';
import screenNames from '../../features/Auth/navigation/screenNames';
import {DefaultTheme} from '../../theme';

export default function Screen({loading, navigation}) {
  const _onSubmit = () => {};

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
          <Text style={{textAlign: 'center'}}>
            Sudah punya akun?
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
