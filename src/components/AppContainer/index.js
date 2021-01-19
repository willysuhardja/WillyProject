import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultTheme} from '../../theme';

const AppContainer = ({children, containerStyle, start}) => (
  <View style={[styles.background]}>
    <View
      style={[styles.container, start ? styles.flexStart : {}, containerStyle]}
      behavior="padding">
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    borderColor: DefaultTheme.colors.transparent1,
  },
  container: {
    flex: 1,
    elevation: 3,
    padding: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: DefaultTheme.colors.transparent1,
    borderWidth: 0.6,
  },
  flexStart: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default memo(AppContainer);
