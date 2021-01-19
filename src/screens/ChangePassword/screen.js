import React from 'react';
import {Alert, ScrollView} from 'react-native';
import {AppContainer, AppBasicHeader} from '../../components';
import {DefaultTheme} from '../../theme';
import ChangePasswordForm from './components/ChangePasswordForm';

const Screen = ({navigation, loading, doChangePassword}) => {
  const _onSubmit = (data) => {
    doChangePassword(data)
      .then(() => {
        Alert.alert('Success', 'password has been changed', [
          {
            text: 'Ok',
            onPress: () => {
              navigation.goBack();
            },
          },
        ]);
      })
      .catch((error) => {
        const message =
          error?.response?.data?.error?.message || 'something when wrong';

        Alert.alert('Failed', message);
      });
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{minHeight: '100%'}}>
      <AppBasicHeader app />
      <AppContainer
        start
        containerStyle={{
          backgroundColor: DefaultTheme.colors.surface,
        }}>
        <ChangePasswordForm onSubmit={_onSubmit} loading={loading} />
      </AppContainer>
    </ScrollView>
  );
};

export default Screen;
