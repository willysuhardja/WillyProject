import React, {useState} from 'react';
import {Image} from 'react-native';
import AppShimmer from './../AppShimmer';

import {Colors, TouchableRipple} from 'react-native-paper';
import makeStyles from './style';

export default function AppImage({image, imageStyle, onImagePress, theme}) {
  const [imageVisible, setImageVisible] = useState(false);

  const styles = makeStyles(theme);
  return (
    <AppShimmer
      shimmerStyle={{backgroundColor: theme.colors.background}}
      shimmerColors={[theme.colors.background, Colors.grey300, Colors.grey400]}
      style={[styles.image, imageStyle]}
      visible={imageVisible}>
      <TouchableRipple
        style={[styles.image, imageStyle]}
        onPress={onImagePress}>
        <Image
          style={[styles.image, imageStyle]}
          onLoadEnd={() => setImageVisible(true)}
          source={{uri: image}}
        />
      </TouchableRipple>
    </AppShimmer>
  );
}
