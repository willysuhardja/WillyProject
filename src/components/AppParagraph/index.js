import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {DefaultTheme} from '../../theme';

const AppParagraph = ({children, center}) => (
  <Text style={[styles.text, center && styles.center]}>{children}</Text>
);

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: DefaultTheme.colors.text,
    marginBottom: 14,
  },
  center: {textAlign: 'center'},
});

export default memo(AppParagraph);
