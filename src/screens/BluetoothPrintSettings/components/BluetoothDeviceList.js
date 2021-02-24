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
        style={{width: theme.screenWidth}}
        title="Already Paired"
        titleStyle={{color: theme.colors.primary}}>
        {alreadyPairedList.map((item, index) => {
          return (
            <List.Item
              style={{width: theme.screenWidth}}
              onPress={() => onItemPressed(item)}
              title={item.name}
              key={'alreadyPaired' + index.toString()}
              description={item.address}
            />
          );
        })}
      </List.Section>
      <List.Section
        style={{width: theme.screenWidth}}
        title="Founded Paired"
        titleStyle={{color: theme.colors.primary}}>
        {foundedList.map((item, index) => {
          return (
            <List.Item
              style={{width: theme.screenWidth}}
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
