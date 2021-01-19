import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {DefaultTheme} from '../../theme';

const AppTextLink = ({onPress, children, style, containerStyle}) => {
  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={onPress}>
      <Text style={[styles.label, style]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: DefaultTheme.spacing,
  },
  label: {
    color: DefaultTheme.colors.primary,
  },
});

export default AppTextLink;
