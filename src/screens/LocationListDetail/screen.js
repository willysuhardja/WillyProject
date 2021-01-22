import React, {Fragment, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  AppBasicHeader,
  AppContainer,
  AppListFooter,
  AppSearchForm,
} from '../../components';
import screenNames from '../../features/Location/navigation/screenNames';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import {LocationItem} from './components/LocationItem';

const Screen = ({locationLoading, locations, doGetLocations, navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      doGetLocations();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const _onLocationPressed = (item) => {
    navigation.navigate(screenNames.detail);
  };

  const renderItem = ({item}) => (
    <LocationItem title={item.name} status={item.status} />
  );

  return (
    <Fragment>
      <AppBasicHeader />
      <AppSearchForm
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['name']}
        placeholder="Search Item"
        list={locations}
      />
      <AppContainer containerStyle={styles.container}>
        <FlatList
          contentContainerStyle={{width: '100%'}}
          refreshControl={refreshControl(locationLoading, doGetLocations)}
          data={searchText.length > 0 ? searchResult : locations}
          keyExtractor={keyExtractor('location')}
          renderItem={renderItem}
          ListFooterComponent={<AppListFooter />}
        />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;

const styles = {
  container: {
    marginTop: 20,
  },
};
