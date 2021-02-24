import React from 'react';
import {AppContainer} from '../../components';
import screenNames from '../../features/WebView/navigation/screenNames';

import UrlForm from './components/UrlForm';

const defaultValue = {
  url: 'https://www.google.com/',
};

const Screen = ({navigation}) => {
  const onSubmit = ({url}) => {
    navigation.navigate(screenNames.webview, {
      url,
    });
  };
  return (
    <AppContainer>
      <UrlForm defaultValue={defaultValue} onSubmit={onSubmit} />
    </AppContainer>
  );
};

export default Screen;
