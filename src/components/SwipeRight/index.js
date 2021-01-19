import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {DefaultTheme} from '../../theme';

const SwipeRight = ({
  maxHeight = null,
  trash = true,
  edit = true,
  onDelete = () => {},
  onEdit = () => {},
  loading = false,
}) => {
  return (
    <View style={[styles.container, {maxHeight}]}>
      <View style={styles.row}>
        {trash && (
          <IconButton
            disabled={loading}
            onPress={onDelete}
            icon="delete-forever"
            size={40}
            color={DefaultTheme.colors.white}
            style={styles.left}
          />
        )}
        {edit && (
          <IconButton
            disabled={loading}
            onPress={onEdit}
            icon="pencil"
            size={40}
            color={DefaultTheme.colors.white}
            style={styles.right}
          />
        )}
        {loading && <ActivityIndicator style={styles.loading} />}
      </View>
    </View>
  );
};

export default SwipeRight;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 12,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'flex-end',
    top: 0,
    width: 125,
  },
  row: {flexDirection: 'row'},
  left: {
    backgroundColor: DefaultTheme.colors.error,
    borderRadius: 4,
    margin: 1,
    height: '100%',
  },
  loading: {position: 'absolute', top: 0, left: 0, bottom: 0, right: 0},
  right: {
    backgroundColor: DefaultTheme.colors.blue,
    borderRadius: 4,
    margin: 1,
    height: '100%',
  },
});
