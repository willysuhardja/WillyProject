import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {Button, IconButton} from 'react-native-paper';

const AppButtonAbsolute = ({onPress, icon, iconSize = 36, label}) => (
  <View style={styles.container}>
    {label ? (
      <Button icon={icon} mode={'text'} onPress={onPress}>
        {label}
      </Button>
    ) : (
      <IconButton icon={icon} size={iconSize} onPress={onPress} />
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 10,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(AppButtonAbsolute);
