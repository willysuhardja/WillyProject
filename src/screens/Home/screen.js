import React, {Fragment, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Text, Title} from 'react-native-paper';
import {AppContainer, AppBasicHeader} from '../../components';
import {DefaultTheme} from '../../theme';

import Menu from './components/Menu';

const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
];

const Screen = (props) => {
  const {
    profile,
    branch,
    menu,
    fetchUserProfile,
    doGetMenu,
    menuLoading,
  } = props;

  useEffect(() => {
    const bootstrap = () => {
      requestPermisionAndroid();
      fetchUserProfile();
      doGetMenu();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestPermisionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple(permissions);

      if (Object.values(granted).includes('denied')) {
        return requestPermisionAndroid();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Fragment>
      <View>
        <AppBasicHeader />
        <View style={styles.profileContainer}>
          <Text style={{color: DefaultTheme.colors.secondary}}>Welcome</Text>
          <Title style={{color: DefaultTheme.colors.surface}}>
            {profile.full_name}
          </Title>
          <Text style={styles.storeText}>
            {branch.name} ({branch.initial})
          </Text>
        </View>
      </View>
      <AppContainer containerStyle={styles.containerStyle}>
        <Menu items={menu} doGetMenu={doGetMenu} loading={menuLoading} />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;
const styles = {
  profileContainer: {position: 'absolute', top: 0, padding: 20, width: '100%'},
  storeText: {color: DefaultTheme.colors.surface, textAlign: 'right'},
  containerStyle: {
    marginTop: 20,
    backgroundColor: DefaultTheme.colors.surface,
  },
};
