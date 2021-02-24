import React, {Fragment, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Subheading, Text, Title} from 'react-native-paper';
import {
  AppContainer,
  AppBasicHeader,
  AppCarousel,
  AppScrollView,
  AppIconButton,
} from '../../components';
import {DefaultTheme} from '../../theme';

const permissions = [
  PermissionsAndroid.PERMISSIONS.CAMERA,
  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
];

const Screen = (props) => {
  const {
    profile,
    branch,
    menu,
    fetchUserProfile,
    doGetMenu,
    navigation,
    carouselData,
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

  const _onMenuItemPressed = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  return (
    <Fragment>
      <AppScrollView>
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
          <View>
            <Subheading style={styles.subheading}>Main Menu</Subheading>
            <View style={styles.row}>
              {menu.map((item, index) => {
                return (
                  <View key={index.toString()}>
                    <AppIconButton
                      onPress={() => _onMenuItemPressed(item)}
                      containerStyle={styles.menuItemContainer}
                      icon={item.icon}
                      label={item.name}
                    />
                  </View>
                );
              })}
            </View>
            <Subheading style={styles.subheading}>Corousel example</Subheading>
            <AppCarousel
              containerStyle={styles.carouselContainer}
              imageStyle={styles.carouselImage}
              data={carouselData}
              autoScrollEnabled={true}
              autoScrollDuration={5000}
            />
          </View>
        </AppContainer>
      </AppScrollView>
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
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  mainMenuWrapper: {
    marginTop: 10,
  },
  subheading: {
    paddingHorizontal: 10,
  },
  menuItemContainer: {
    width: DefaultTheme.screenWidth / 3 - 20,
    padding: 5,
    margin: 5,
  },
  carouselContainer: {
    height: 200,
  },
  carouselImage: {
    height: 200,
  },
};
