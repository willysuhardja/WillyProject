import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {List} from 'react-native-paper';
import {DefaultTheme} from '../../../theme';

export default function StoreItem({slug, name, onPress = () => {}, active}) {
  return (
    <List.Item
      style={[
        styles.container,
        active && {backgroundColor: DefaultTheme.colors.accent},
      ]}
      title={name}
      description={slug}
      onPress={onPress}
      left={(props) => <List.Icon {...props} icon="store" />}
    />
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, width: Dimensions.get('screen').width},
});
