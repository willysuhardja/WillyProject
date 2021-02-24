import React, {useState} from 'react';

import LinearGradient from 'react-native-linear-gradient';
import {Card, TouchableRipple} from 'react-native-paper';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function CardCoverImage({image, onImagePress}) {
  const [imageVisible, setImageVisible] = useState(false);
  return (
    <ShimmerPlaceHolder style={styles.image} visible={imageVisible}>
      <TouchableRipple
        style={styles.image}
        onPress={imageVisible && onImagePress}>
        <Card.Cover
          style={styles.image}
          onLoadEnd={() => setImageVisible(true)}
          source={{uri: image}}
        />
      </TouchableRipple>
    </ShimmerPlaceHolder>
  );
}

const styles = {
  image: {
    alignSelf: 'center',
    resizeMode: 'cover',
    height: 200,
    aspectRatio: 1,
  },
};
