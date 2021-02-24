import React, {useCallback, useEffect, useRef, useState} from 'react';
import {View, Animated} from 'react-native';

import {keyExtractor} from '../../utils/flatlist';

import AppImage from '../AppImage';

import makeStyles from './style';

const AppCarousel = ({
  data,
  autoScrollEnabled = false,
  autoScrollDuration = 2000,
  key = 'corousel',
  theme,
  containerStyle,
  imageStyle,
  ...props
}) => {
  const maxIndex = data.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const onViewRef = useRef(({viewableItems}) => {
    setActiveIndex(viewableItems[0].index);
    // Use viewable items in state or as intended
  });
  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const autoScrollFlatlist = useCallback(() => {
    let nextIndex = 0;

    if (activeIndex < maxIndex) {
      nextIndex = activeIndex + 1;
    }

    scrollToIndex(nextIndex, true);
  }, [activeIndex, maxIndex]);

  const scrollToIndex = (index, animated = true) => {
    flatListRef.current.scrollToIndex({index, animated});
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoScrollEnabled) {
        autoScrollFlatlist();
      }
    }, autoScrollDuration);

    return () => clearInterval(interval);
  }, [autoScrollDuration, autoScrollEnabled, autoScrollFlatlist]);

  const styles = makeStyles(theme);

  const renderItem = ({item}) => {
    return (
      <AppImage
        image={item.image_url}
        imageStyle={[styles.image, imageStyle]}
      />
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.FlatList
        ref={flatListRef}
        data={data}
        keyExtractor={keyExtractor(key)}
        renderItem={renderItem}
        snapToInterval={theme.screenWidth}
        decelerationRate="fast"
        maxToRenderPerBatch={2}
        initialNumToRender={1}
        bounces={false}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: true},
        )}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      <View style={styles.pagination}>
        <View style={styles.dotsWrapper}>
          {data.map((item, index) => {
            return (
              <View
                key={key + '-indicator-' + index.toString()}
                style={styles.dot}
              />
            );
          })}
          <Animated.View
            style={[
              styles.dotIndicator,
              {
                transform: [
                  {
                    translateX: Animated.divide(
                      scrollX,
                      theme.screenWidth,
                    ).interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 12],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

export default AppCarousel;
