import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {DefaultTheme} from '../../theme';

const AppHeaderText = ({children, center}) => (
  <Text style={[styles.header, center ? styles.center : null]}>{children}</Text>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 26,
    color: DefaultTheme.colors.primary,
    fontWeight: 'bold',
    paddingVertical: 14,
  },
  center: {
    textAlign: 'center',
  },
});

export default memo(AppHeaderText);
