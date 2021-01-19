import React, {Fragment, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {AppContainer, AppBackgroundWave} from '../../components';
import menus from '../../data/menu';
import {DefaultTheme} from '../../theme';

import Menu from './components/Menu';

const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
];

const Screen = (props) => {
  const {profile, fetchUserProfile} = props;

  useEffect(() => {
    const bootstrap = () => {
      fetchUserProfile();

      requestPermisionAndroid();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestPermisionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(permissions);

      if (granted[0] === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Fragment>
      <View>
        <AppBackgroundWave
          height={150}
          barHeight={100}
          svgTop={25}
          svgHeight="130%"
          color={DefaultTheme.colors.primary}
          backColor={DefaultTheme.colors.background}
          pattern="M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,197.3C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
        />
        <View
          style={{position: 'absolute', top: 0, padding: 20, width: '100%'}}>
          <Text style={{color: DefaultTheme.colors.secondary}}>Welcome</Text>
          <Title style={{color: DefaultTheme.colors.surface}}>
            {profile.name}
          </Title>
          <Text
            style={{color: DefaultTheme.colors.surface, textAlign: 'right'}}>
            Griya Antapani (ATP)
          </Text>
        </View>
      </View>
      <AppContainer
        containerStyle={{
          marginTop: 20,
          backgroundColor: DefaultTheme.colors.surface,
        }}>
        <Menu items={menus} />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;
