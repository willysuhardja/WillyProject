import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {AppIconButton} from '../../../components';
import {DefaultTheme} from '../../../theme';

const Menu = ({items, onPress = () => {}}) => {
  const navigation = useNavigation();
  const handleMenuPressed = (menu) => {
    navigation.navigate(menu.screen);
  };

  return (
    <FlatList
      data={items}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      scrollToOverflowEnabled={true}
      keyExtractor={(item, index) => `Menu-${index}`}
      renderItem={({item, index}) => {
        return (
          <AppIconButton
            onPress={() => handleMenuPressed(item)}
            icon={item.icon}
            size={90}
            label={item.name}
            color={DefaultTheme.colors.primary}
          />
        );
      }}
    />
  );
};

export default memo(Menu);
