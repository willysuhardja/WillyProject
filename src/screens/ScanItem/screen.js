import {useFocusEffect} from '@react-navigation/native';
import React, {Fragment, useEffect, useCallback, useLayoutEffect} from 'react';
import {Alert, StatusBar} from 'react-native';
import {AppLoadingBasic} from '../../components';
import {DefaultTheme} from '../../theme';
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: DefaultTheme.colors.secondary,
      },
    });
  });

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(DefaultTheme.colors.secondary);

      return () => {
        StatusBar.setBackgroundColor(DefaultTheme.colors.primary);
      };
    }, []),
  );

  const doVerification = () => {
    doVerifyLocation(location).catch((error) => {
      return Alert.alert('Error', error.message, [
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
