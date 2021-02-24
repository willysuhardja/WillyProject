import React from 'react';
import {IconButton, Text, TouchableRipple} from 'react-native-paper';
import makeStyles from './style';

const AppIconButton = ({
  theme,
  style,
  label,
  labelStyle,
  containerStyle,
  onPress = () => {},
  ...props
}) => {
  const styles = makeStyles(theme);
  return (
    <TouchableRipple style={[styles.button, containerStyle]} onPress={onPress}>
      <>
        <IconButton style={[styles.icon, style]} {...props} />
        {!!label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      </>
    </TouchableRipple>
  );
};

export default AppIconButton;
