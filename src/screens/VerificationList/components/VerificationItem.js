import React from 'react';
import {Dimensions} from 'react-native';
import {Divider, List, Badge} from 'react-native-paper';
import {AppButton} from '../../../components';
import {DefaultTheme} from '../../../theme';

export default function VerificationItem({title, status, onPress, disabled}) {
  const badgeColor =
    status === 'Belum diupload'
      ? DefaultTheme.colors.secondary
      : status === 'Belum dihitung'
      ? DefaultTheme.colors.error
      : status === 'Sudah verifikasi'
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
          <>
            <AppButton
              onPress={onPress}
              disabled={disabled || status !== 'Belum verifikasi'}
              style={styles.button}
              contentStyle={{justifyContent: 'flex-start'}}
              mode="text">
              {status === 'Sudah Verifikasi' ? 'Verified' : 'Verification'}
            </AppButton>
          </>
        )}
      />
      <Divider />
    </>
  );
}

const styles = {
  container: {flex: 1, width: Dimensions.get('screen').width},
  button: {maxWidth: 190, padding: 0, margin: 0},
  badge: {maxWidth: 200, alignSelf: 'flex-start'},
};
