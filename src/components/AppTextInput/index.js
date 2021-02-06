import React, {memo} from 'react';
import {StyleSheet, Text} from 'react-native';
import {
  ActivityIndicator,
  TextInput as Input,
  TouchableRipple,
} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const AppTextInput = ({
  errorText,
  infoText,
  inputStyle,
  containerStyle,
  loading = false,
  onPress = null,
  disabled = false,
  ...props
}) => {
  return (
    <TouchableRipple
      style={[styles.container, containerStyle]}
      disabled={disabled}
      onPress={onPress}>
      <>
        <Input
          mode="outlined"
          underlineColor="transparent"
          selectionColor={DefaultTheme.colors.primary}
          {...props}
          style={[styles.input, inputStyle]}
        />
        {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        {infoText ? <Text style={styles.info}>{infoText}</Text> : null}
        {loading && <ActivityIndicator style={styles.loading} />}
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 6,
  },
  input: {
    backgroundColor: DefaultTheme.colors.white,
    borderColor: DefaultTheme.colors.transparent1,
    borderWidth: 0.6,
  },
  loading: {
    position: 'absolute',
    right: 20,
    top: 22,
  },
  error: {
    fontSize: 14,
    color: DefaultTheme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
  info: {
    fontSize: 14,
    color: DefaultTheme.colors.text,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(AppTextInput);
