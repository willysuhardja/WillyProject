import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
const Logo = ({imageStyle, type = 'logo2'}) => {
  return (
    <Image
      source={
        type === 'logo2'
          ? require('../../assets/logo2.png')
          : type === 'company'
          ? require('../../assets/logo-company.jpg')
          : null
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
