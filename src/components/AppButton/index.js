import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const AppButton = ({mode, style, children, loading = false, ...props}) => (
  <PaperButton
    dark={true}
    style={[
      styles.button,
      mode === 'outlined' && {backgroundColor: DefaultTheme.colors.surface},
      style,
    ]}
    labelStyle={styles.text}
    mode={mode}
    loading={loading}
    {...props}>
    {!loading ? children : ''}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(AppButton);
