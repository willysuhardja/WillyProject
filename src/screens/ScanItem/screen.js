import React, {Fragment, useEffect} from 'react';
import {Alert} from 'react-native';
import {AppLoadingBasic} from '../../components';
import Scanner from '../Scanner';

const Screen = ({
  navigation,
  route,
  verificationLoading,
  verificationError,
  doVerifyLocation,
  ...props
}) => {
  const {barcode: location} = route.params;

  useEffect(() => {
    const bootstrap = () => {
      doVerification();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const doVerification = () => {
    doVerifyLocation(location).catch((message) => {
      return Alert.alert('Error', message, [
        {
          text: 'Re Scan',
          onPress: navigation.goBack,
        },
      ]);
    });
  };

  if (verificationLoading) {
    return <AppLoadingBasic />;
  }

  if (verificationError) {
    return <Fragment />;
  }

  return <Scanner navigation={navigation} route={route} {...props} />;
};

export default Screen;
