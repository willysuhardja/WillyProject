import React from 'react';
import {ScrollView} from 'react-native';
import {AppContainer, AppBasicHeader} from '../../components';
import {DefaultTheme} from '../../theme';
const Screen = ({}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{minHeight: '100%'}}>
      <AppBasicHeader app />
      <AppContainer
        start
        containerStyle={{
          backgroundColor: DefaultTheme.colors.surface,
        }}
      />
    </ScrollView>
  );
};

export default Screen;
