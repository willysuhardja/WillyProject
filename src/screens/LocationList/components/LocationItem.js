import React from 'react';
import {Dimensions} from 'react-native';
import {Divider, List, Badge} from 'react-native-paper';
import {AppButton} from '../../../components';
import {DefaultTheme} from '../../../theme';

export function LocationItem({title, status, onPress, disabled}) {
  const badgeColor =
    status === 'Belum diupload'
      ? DefaultTheme.colors.secondary
      : status === 'Belum dihitung'
      ? DefaultTheme.colors.error
      : status === 'Sudah verifikasi' || status === 'Finish'
      ? DefaultTheme.colors.success
      : DefaultTheme.colors.secondary;

  return (
    <>
      <List.Item
        title={title}
        description={() => (
          <Badge style={[styles.badge, {backgroundColor: badgeColor}]}>
            {status}
          </Badge>
        )}
        style={[styles.container]}
        right={() => (
          <AppButton
            onPress={onPress}
            disabled={disabled || status === 'Belum dihitung'}
            style={styles.button}
            mode="text">
            View
          </AppButton>
        )}
      />
      <Divider />
    </>
  );
}

const styles = {
  container: {flex: 1, width: Dimensions.get('screen').width},
  button: {maxWidth: 150},
  badge: {maxWidth: 200, alignSelf: 'flex-start'},
};
