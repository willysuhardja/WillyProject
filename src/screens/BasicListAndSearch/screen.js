import React, {useLayoutEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Divider, List, useTheme} from 'react-native-paper';
import {
  AppContainer,
  AppListEmpty,
  AppListFooter,
  AppSearchForm,
} from '../../components';
import {keyExtractor} from '../../utils/flatlist';

const Screen = ({
  navigation,
  list,
  refreshControl,
  onItemPressed,
  searchFields,
  searchPlaceholder,
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const {colors} = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => {
        return (
          <AppSearchForm
            setSearchResult={setSearchResult}
            setSearchText={setSearchText}
            searchFields={searchFields}
            placeholder={searchPlaceholder}
            list={list}
            dense
            inputStyle={{
              borderWidth: 0,
              paddingVertical: 0,
              marginVertical: 0,
              marginLeft: 0,
            }}
          />
        );
      },
    });
  }, [colors.primary, list, navigation, searchFields, searchPlaceholder]);

  return (
    <AppContainer>
      <FlatList
        style={{width: '100%'}}
        data={searchText.length === 0 ? list : searchResult}
        keyExtractor={keyExtractor('list')}
        refreshControl={refreshControl}
        renderItem={({item}) => {
          return (
            <>
              <List.Item
                title={item.name}
                description={item.description}
                onPress={() => onItemPressed(item)}
              />
              <Divider />
            </>
          );
        }}
        ListEmptyComponent={<AppListEmpty />}
        ListFooterComponent={<AppListFooter />}
      />
    </AppContainer>
  );
};

export default Screen;
