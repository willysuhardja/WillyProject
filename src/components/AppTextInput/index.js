import React, {memo} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActivityIndicator, TextInput as Input} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const AppTextInput = ({
  errorText,
  infoText,
  inputStyle,
  containerStyle,
  loading = false,
  ...props
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Input
        style={[styles.input, inputStyle]}
        selectionColor={DefaultTheme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        {...props}
      />
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
      {infoText ? <Text style={styles.info}>{infoText}</Text> : null}
      {loading && <ActivityIndicator style={styles.loading} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
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
