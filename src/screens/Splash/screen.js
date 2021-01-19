import React, {useState} from 'react';
import {View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import {AppParagraph} from '../../components';

const Screen = (props) => {
  const {status, progress} = props;

  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);

  console.log(status, progress);
  return (
    <View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            <AppParagraph>This is simple dialog</AppParagraph>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Screen;
