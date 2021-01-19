import React from 'react';
import {View, StyleSheet} from 'react-native';
import {DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import {
  Title,
  Caption,
  Drawer,
  Text,
  TouchableRipple,
  IconButton,
} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {getProfile} from '../../features/AccoutManagement/redux/getters';

export default function DrawerContent(props) {
  const {navigation} = props;
  const dispatch = useDispatch();
  const profile = useSelector(getProfile);
  const handleNavigateProfile = () => {
    navigation.navigate('Profile');
  };
  const handleNavigationHome = () => {
    navigation.navigate('Home');
  };
  // const handleNavigationSyncronization = () => {
  //   navigation.navigate('Synchronization');
  // };
  const handleLogout = () => {
    navigation.closeDrawer();
    dispatch({type: 'LOGOUT'});
  };
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContent}>
        <View style={styles.userInfoSection}>
          <View>
            <Title>Global Stock Opname</Title>
          </View>
          <Title style={styles.title}>{profile.full_name}</Title>
          <Caption style={styles.caption}>{profile.initial_store}</Caption>
        </View>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({color, size}) => (
              <IconButton icon="home" color={color} size={size} />
            )}
            label="Home"
            onPress={handleNavigationHome}
          />
          {/* <DrawerItem
            icon={({color, size}) => (
              <IconButton icon="sync" color={color} size={size} />
            )}
            label="Syncronization"
            onPress={handleNavigationSyncronization}
          /> */}
          <DrawerItem
            icon={({color, size}) => (
              <IconButton icon="account" color={color} size={size} />
            )}
            label="Profile"
            onPress={handleNavigateProfile}
          />
        </Drawer.Section>
        <Drawer.Section title="Authentication">
          <View flex={1} justify="flex-end">
            <TouchableRipple onPress={handleLogout}>
              <View style={styles.preference}>
                <Text>Logout</Text>
              </View>
            </TouchableRipple>
          </View>
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
