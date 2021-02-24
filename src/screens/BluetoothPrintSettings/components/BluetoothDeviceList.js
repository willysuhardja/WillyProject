import React from 'react';
import {List, withTheme} from 'react-native-paper';

const BluetoothDeviceList = ({
  alreadyPairedList,
  foundedList,
  onItemPressed,
  theme,
}) => {
  return (
    <>
      <List.Section
        title="Already Paired"
        titleStyle={{color: theme.colors.primary}}
        style={{width: theme.screenWidth}}>
        {alreadyPairedList.map((item, index) => {
          return (
            <List.Item
              onPress={() => onItemPressed(item)}
              title={item.name}
              key={'alreadyPaired' + index.toString()}
              description={item.address}
            />
          );
        })}
      </List.Section>
      <List.Section
        title="Founded Paired"
        titleStyle={{color: theme.colors.primary}}
        style={{width: theme.screenWidth}}>
        {foundedList.map((item, index) => {
          return (
            <List.Item
              onPress={() => onItemPressed(item)}
              title={item.name}
              key={'founded' + index.toString()}
              description={item.address}
            />
          );
        })}
      </List.Section>
    </>
  );
};

export default withTheme(BluetoothDeviceList);
