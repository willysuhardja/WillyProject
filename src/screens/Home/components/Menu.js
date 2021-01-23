import {useNavigation} from '@react-navigation/native';
import React, {memo} from 'react';
import {FlatList} from 'react-native';
import {AppIconButton} from '../../../components';
import {DefaultTheme} from '../../../theme';
import {refreshControl} from '../../../utils/flatlist';

const Menu = ({items, loading, doGetMenu}) => {
  const navigation = useNavigation();
  const handleMenuPressed = (menu) => {
    navigation.navigate(menu.screen);
  };

  return (
    <FlatList
      data={items}
      refreshControl={refreshControl(loading, doGetMenu)}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      numColumns={2}
      scrollToOverflowEnabled={true}
      keyExtractor={(item, index) => `Menu-${index}`}
      renderItem={({item, index}) => {
        const disabled = item.is_active === 0;
        return (
          <AppIconButton
            onPress={() => handleMenuPressed(item)}
            disabled={disabled}
            icon={item.icon}
            size={90}
            label={item.name}
            color={
              disabled
                ? DefaultTheme.colors.disabled
                : DefaultTheme.colors.primary
            }
          />
        );
      }}
    />
  );
};

export default memo(Menu);
