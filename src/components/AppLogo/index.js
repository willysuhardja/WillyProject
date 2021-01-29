import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
const Logo = ({imageStyle, size = 'sm', type}) => {
  return (
    <Image
      source={
        type === 'logo2'
          ? require('../../assets/logo2.png')
          : size === 'sm'
          ? require('../../assets/logo-sm.png')
          : require('../../assets/logo-lg.png')
      }
      style={[styles.image, imageStyle, {resizeMode: 'stretch'}]}
    />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 128,
    width: '100%',
    marginBottom: 12,
  },
});

export default memo(Logo);
