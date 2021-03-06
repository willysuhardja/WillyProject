import React from 'react';
import {StyleSheet, TouchableNativeFeedback} from 'react-native';
import {Text} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const AppTextLink = ({onPress, children, style}) => {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Text style={[styles.label, style]}>{children}</Text>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  label: {
    color: DefaultTheme.colors.primary,
  },
});

export default AppTextLink;
