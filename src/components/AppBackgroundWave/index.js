import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Path, Svg} from 'react-native-svg';
import {NavigationTheme} from '../../theme';

export default function AppBackgroundWave({
  height,
  barHeight = height * 0.5,
  svgHeight = '60%',
  svgTop,
  color,
  pattern,
  backColor,
}) {
  return (
    <View style={[styles.container, {height}]}>
      <View
        style={{
          backgroundColor: color,
          height: barHeight,
        }}
      />
      <Svg
        height={svgHeight}
        width="100%"
        viewBox="0 0 1440 320"
        style={[{top: svgTop}, styles.svg]}>
        <Path fill={color} d={pattern} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'visible',
    backgroundColor: NavigationTheme.colors.background,
  },
  svg: {position: 'absolute'},
});
