import React, {useEffect} from 'react';
import {Alert, ScrollView, View} from 'react-native';
import {Divider, List, Text, Title} from 'react-native-paper';
import {AppBasicHeader} from '../../components';
import config from '../../config';
import {doResetDatabase} from '../../database';
import screenNames from '../../features/AccoutManagement/navigation/screenNames';
import {DefaultTheme} from '../../theme';

const Screen = (props) => {
  const {
    profile,
    navigation,
    setUserToken,
    setBranch,
    fetchUserProfile,
  } = props;

  useEffect(() => {
    const bootstrap = () => {
      if (!profile.full_name) {
        fetchUserProfile();
      }
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChooseStore = () => {
    navigation.navigate(screenNames.index, {
      screen: screenNames.chooseStore,
      params: {},
    });
  };

  const onUpdateProfile = () => {
    navigation.navigate(screenNames.index, {
      screen: screenNames.updateProfile,
      params: {},
    });
  };

  const onChangePassword = () => {
    navigation.navigate(screenNames.index, {
      screen: screenNames.changePassword,
      params: {},
    });
  };

  const onResetLocalData = () => {
    return Alert.alert(
      'Perhatian',
      'Local data seperti:\n1. item lokasi\nakan dihapus dari data local',
      [
        {
          text: 'Batal',
        },
        {
          text: 'Saya Mengerti,',
          onPress: () => {
            doResetDatabase();
          },
        },
      ],
    );
  };

  const _onLogout = () => {
    Alert.alert('Logout ?', '', [
      {
        text: 'Cancel',
      },
      {
        text: 'Logout',
        onPress: () => {
          setUserToken();
          setBranch();
        },
      },
    ]);
  };

  return (
    <ScrollView>
      <View>
        <AppBasicHeader app />
        <View style={styles.profileContainer}>
          <View style={styles.profile}>
            <View style={styles.profileName}>
              <Title style={{color: DefaultTheme.colors.surface}}>
                {profile.full_name}
              </Title>
              <Text style={{color: DefaultTheme.colors.secondary}}>
                as {profile.role_name}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.listContainer}>
        <List.Section>
          <List.Subheader>Account</List.Subheader>
          <List.Item
            onPress={onUpdateProfile}
            title="Update Profile"
            left={() => (
              <List.Icon
                color={DefaultTheme.colors.primary}
                icon="account-edit"
              />
            )}
          />
          <List.Item
            onPress={onChangePassword}
            title="Change Password"
            left={() => (
              <List.Icon
                color={DefaultTheme.colors.primary}
                icon="account-lock"
              />
            )}
          />
          <List.Subheader>Store</List.Subheader>
          <List.Item
            onPress={onChooseStore}
            title="Choose Store"
            left={() => (
              <List.Icon color={DefaultTheme.colors.primary} icon="store" />
            )}
          />
          <List.Subheader>Others</List.Subheader>
          <List.Item
            onPress={onResetLocalData}
            title="Reset Local Data"
            left={() => (
              <List.Icon
                color={DefaultTheme.colors.primary}
                icon="database-settings"
              />
            )}
          />
          <List.Item
            title="About"
            left={() => (
              <List.Icon
                color={DefaultTheme.colors.primary}
                icon="information-outline"
              />
            )}
            right={() => (
              <View style={styles.versionText}>
                <Text>Version {config.appVersion}</Text>
              </View>
            )}
          />
        </List.Section>
        <Divider />
        <List.Item
          onPress={_onLogout}
          title="Logout"
          titleStyle={{
            color: DefaultTheme.colors.error,
          }}
          left={() => (
            <List.Icon
              color={DefaultTheme.colors.error}
              icon="logout-variant"
            />
          )}
        />
      </View>
    </ScrollView>
  );
};

export default Screen;

const styles = {
  profileContainer: {position: 'absolute', top: 0, padding: 20},
  profile: {flexDirection: 'row', justifyContent: 'center'},
  profileName: {marginHorizontal: 10},
  listContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  versionText: {justifyContent: 'center', paddingHorizontal: 20},
};
