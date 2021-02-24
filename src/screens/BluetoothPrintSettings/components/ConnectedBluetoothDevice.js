import React from 'react';
import {List, withTheme} from 'react-native-paper';

const ConnectedBluetoothDevices = ({paired, theme}) => {
  return (
    <List.Section
      title="Connected Device"
      style={{backgroundColor: theme.colors.accent, width: theme.screenWidth}}>
      <List.Item title={paired.name} description={paired.address} />
    </List.Section>
  );
};

export default withTheme(ConnectedBluetoothDevices);
