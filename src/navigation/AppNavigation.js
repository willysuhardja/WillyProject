import React, {Fragment, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import CodePush from 'react-native-code-push';

import MainStack from './../features/Main/navigation';
import AuthStack from './../features/Auth/navigation';

import {getUserToken} from './../features/Auth/redux/getters';
import {useCodePush} from '../providers/CodePush';
import {Dialog, Portal} from 'react-native-paper';
import {AppLoadingBasic, AppParagraph} from '../components';
import {View} from 'react-native';

const AppNavigation = () => {
  const token = useSelector(getUserToken);
  const {status, progress} = useCodePush();

  const [isNavReady, setIsNavReady] = useState(false);

  const [modalVisible, setModalVisible] = useState(true);
  const [statusText, setStatusText] = useState('');

  const hideModal = () => setModalVisible(false);

  useEffect(() => {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        setStatusText('Checking for update');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        setStatusText('Downloading Package');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        setStatusText('Installing Progress');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        setStatusText('Up to date');
        setTimeout(() => setIsNavReady(true), 500);
        break;
      case CodePush.SyncStatus.UNKNOWN_ERROR:
        setIsNavReady(true);
        break;
      default:
        break;
    }
  }, [status]);

  if (!isNavReady) {
    return (
      <Portal>
        <Dialog visible={modalVisible} onDismiss={hideModal}>
          <Dialog.Content>
            <View style={styles.dialogWrapper}>
              <AppLoadingBasic />
            </View>
            <AppParagraph center={true}>{statusText}</AppParagraph>
          </Dialog.Content>
        </Dialog>
      </Portal>
    );
  }

  return <Fragment>{token ? <MainStack /> : <AuthStack />}</Fragment>;
};

export default AppNavigation;

const styles = {
  dialogWrapper: {marginTop: 30, marginBottom: 10},
};
