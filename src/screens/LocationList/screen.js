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

const Screen = ({
  locationLoading,
  locations,
  doGetLocations,
  navigation,
  route,
}) => {
  const refresh = route?.params?.refresh || false;

  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      doGetLocations();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (refresh) {
      doGetLocations();

      navigation.setParams({
        refresh: false,
      });
    }
  }, [doGetLocations, navigation, refresh]);

  const _onLocationPressed = (item) => {
    navigation.navigate(screenNames.detail, {
      id: item.id,
      name: item.name,
      mode: item.status_1 ? 'history' : 'local',
    });
  };

  const renderItem = ({item}) => (
    <LocationItem
      disabled={locationLoading}
      title={item.name}
      status={item.status}
      onPress={() => _onLocationPressed(item)}
    />
  );

  return (
    <Fragment>
      <AppBasicHeader />
      <AppSearchForm
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['name']}
        placeholder="Search Location"
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
