import React, {memo} from 'react';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import {Paragraph, Colors, Portal, Dialog} from 'react-native-paper';

const isIOS = Platform.OS === 'ios';

const AppLoadingDialog = ({title = 'Progress', visible, close}) => (
  <Portal>
    <Dialog onDismiss={close} visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <View style={styles.content}>
          <ActivityIndicator
            color={Colors.indigo500}
            size={isIOS ? 'large' : 48}
            style={styles.contentLoading}
          />
          <Paragraph>Loading.....</Paragraph>
        </View>
      </Dialog.Content>
    </Dialog>
  </Portal>
);

const styles = StyleSheet.create({
  content: {flexDirection: 'row', alignItems: 'center'},
  contentLoading: {marginRight: 16},
});

export default memo(AppLoadingDialog);
