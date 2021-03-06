import React from 'react';
import {Appbar, IconButton} from 'react-native-paper';
import {AppLogo} from '..';
import {default as accountScreenNames} from '../../features/AccountMenu/navigation/screenNames';
import {default as homeScreenNames} from '../../features/Home/navigation/screenNames';
import {DefaultTheme} from '../../theme';

const NavHeader = ({scene, previous, navigation}) => {
  const {options} = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const navigateToProfile = () => {
    navigation.navigate(accountScreenNames.index);
  };

  const navigateToHome = () => {
    navigation.navigate(homeScreenNames.index);
  };

  return (
    <Appbar.Header theme={{colors: {primary: DefaultTheme.colors.primary}}}>
      {previous ? (
        <Appbar.BackAction
          onPress={navigation.pop}
          color={DefaultTheme.colors.white}
        />
      ) : (
        <></>
      )}
      <Appbar.Content
        title={
          previous ? (
            title
          ) : (
            <IconButton
              size={100}
              icon={({size, color}) => <AppLogo imageStyle={styles.appLogo} />}
            />
          )
        }
      />
      {scene.route.name === accountScreenNames.index ? (
        <Appbar.Action
          icon="home"
          color={DefaultTheme.colors.secondary}
          onPress={navigateToHome}
        />
      ) : (
        <Appbar.Action
          icon="account"
          color={DefaultTheme.colors.secondary}
          onPress={navigateToProfile}
        />
      )}
    </Appbar.Header>
  );
};

export default NavHeader;

const styles = {
  appLogo: {
    width: 100,
    height: 25,
    marginBottom: 0,
  },
};
