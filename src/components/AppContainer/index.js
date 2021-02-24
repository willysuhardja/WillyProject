import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {DefaultTheme} from '../../theme';

const AppContainer = ({
  children,
  wrapperStyle,
  containerStyle,
  start,
  fluid,
}) => (
  <View
    style={[
      styles.background,
      wrapperStyle,
      fluid && {
        width: DefaultTheme.screenWidth,
      },
    ]}>
    <View
      style={[
        styles.container,
        start ? styles.flexStart : {},
        containerStyle,
        fluid && {
          padding: 0,
          width: DefaultTheme.screenWidth,
          ...styles.flexStart,
        },
      ]}
      behavior="padding">
      {children}
    </View>
  </View>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    padding: 20,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: DefaultTheme.colors.transparent1,
    borderWidth: 0.7,
    elevation: 1,
    backgroundColor: DefaultTheme.colors.background,
  },
  flexStart: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});

export default memo(AppContainer);
