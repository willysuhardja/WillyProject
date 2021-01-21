import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {DefaultTheme} from '../../theme';

const AppParagraph = ({children, center, right}) => (
  <Text style={[styles.text, center && styles.center, right && styles.right]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: DefaultTheme.colors.text,
    marginBottom: 14,
  },
  center: {textAlign: 'center'},
  right: {textAlign: 'right'},
});

export default memo(AppParagraph);
