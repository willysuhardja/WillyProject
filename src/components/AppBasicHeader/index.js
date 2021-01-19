import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Title} from 'react-native-paper';
import {AppBackgroundWave} from './../';
import {DefaultTheme} from '../../theme';

const SVG_PATTERN =
  'M0,224L80,208C160,192,320,160,480,160C640,160,800,192,960,197.3C1120,203,1280,181,1360,170.7L1440,160L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z';

const AppBasicHeader = ({
  title,
  svgPattern = SVG_PATTERN,
  titleStyle = {},
  app,
}) => {
  return (
    <View>
      <AppBackgroundWave
        height={150}
        barHeight={100}
        svgTop={25}
        svgHeight="130%"
        color={DefaultTheme.colors.primary}
        backColor={DefaultTheme.colors.background}
        pattern={svgPattern}
      />
      <View
        style={[
          styles.titleWrapper,
          app ? styles.titleAppWrapper : {},
          titleStyle,
        ]}>
        <Title style={{color: DefaultTheme.colors.surface}}>{title}</Title>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    position: 'absolute',
    top: 0,
    padding: 20,
    backgroundColor: DefaultTheme.colors.primary,
  },
  titleAppWrapper: {marginLeft: 30, marginTop: -12, position: 'absolute'},
});

export default AppBasicHeader;
