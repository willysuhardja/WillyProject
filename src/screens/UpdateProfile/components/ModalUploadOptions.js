import React from 'react';
import {List, Modal, Portal, Title} from 'react-native-paper';

export const resultOptions = {
  camera: 'camera',
  library: 'library',
};

export default function ModalUploadOptions({
  visible,
  setVisible,
  onOptionPressed,
}) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}>
        <Title>Choose Upload Method</Title>
        <List.Item
          title="Use Camera"
          onPress={() => onOptionPressed('camera')}
          left={(props) => <List.Icon {...props} icon="camera" />}
        />
        <List.Item
          title="Use Library"
          onPress={() => onOptionPressed('library')}
          left={(props) => <List.Icon {...props} icon="folder" />}
        />
      </Modal>
    </Portal>
  );
}

const containerStyle = {
  backgroundColor: 'white',
  padding: 20,
  alignSelf: 'center',
  width: '80%',
};
