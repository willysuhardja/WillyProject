import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {IconButton, TouchableRipple} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const SIZE = 72;

const AppIconButton = ({
  onPress = () => {},
  icon,
  size = SIZE - 30,
  label,
  color,
  labelStyle,
}) => {
  return (
    <TouchableRipple
      rippleColor={`${color}22`}
      style={styles.container}
      onPress={onPress}>
      <>
        <View
          style={[
            {
              height: size,
              width: size,
              backgroundColor: DefaultTheme.colors.transparent1,
              borderRadius: size / 4,
            },
            styles.iconContainer,
          ]}>
          <IconButton
            color={color}
            style={styles.icon}
            icon={{source: icon, direction: 'ltr'}}
            size={size - 40}
          />
        </View>
        <Text style={[styles.label, {color: DefaultTheme.colors.grey}]}>
          {label}
        </Text>
      </>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE + 10,
    height: SIZE + 10,
    borderRadius: 25,
    marginHorizontal: 30,
    marginVertical: 40,
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    padding: 0,
    margin: -5,
  },
  label: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '100',
  },
});

export default AppIconButton;
