import React from 'react';
import {View} from 'react-native';
import {Avatar, List, Modal, Portal, Title} from 'react-native-paper';
import {AppButton, AppParagraph} from '..';

export const resultOptions = {
  camera: 'camera',
  library: 'library',
};

export default function AppModalInfo({
  visible,
  setVisible,
  title,
  icon,
  iconColor,
  description,
  actions = [
    {
      text: 'OK',
      onPress: null,
    },
  ],
}) {
  const hideModal = () => {
    setVisible(false);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}>
        {icon && <Avatar.Icon size={24} icon={icon} color={iconColor} />}
        <Title>{title}</Title>
        <AppParagraph>{description}</AppParagraph>
        <View style={styles.buttonActions}>
          {actions.map((action, index) => {
            return (
              <AppButton
                key={index.toString()}
                mode="text"
                onPress={action.onPress ? action.onPress : hideModal}>
                {action.text}
              </AppButton>
            );
          })}
        </View>
      </Modal>
    </Portal>
  );
}

const styles = {
  containerStyle: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignSelf: 'center',
    width: '90%',
  },
  buttonActions: {
    flexDirection: 'row',
  },
};
