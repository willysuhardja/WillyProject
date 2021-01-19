import React, {memo} from 'react';
import {Image, StyleSheet} from 'react-native';
const Logo = ({imageStyle}) => (
  <Image
    source={require('../../assets/logo.png')}
    style={[styles.image, imageStyle]}
  />
);

const styles = StyleSheet.create({
  image: {
    height: 128,
    width: '100%',
    marginBottom: 12,
  },
});

export default memo(Logo);
