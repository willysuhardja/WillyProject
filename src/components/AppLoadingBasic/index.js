import React, {memo} from 'react';
import {ActivityIndicator, StyleSheet, View, Platform} from 'react-native';
import {DefaultTheme} from '../../theme';

const isIOS = Platform.OS === 'ios';

const AppLoadingBasic = ({title = 'Progress', visible, close}) => (
  <View style={styles.content}>
    <ActivityIndicator
      color={DefaultTheme.colors.primary}
      size={isIOS ? 'large' : 48}
      style={styles.contentLoading}
    />
  </View>
);

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  contentLoading: {marginRight: 16},
});

export default memo(AppLoadingBasic);
