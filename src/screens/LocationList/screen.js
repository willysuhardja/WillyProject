import React, {Fragment, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {AppBasicHeader, AppContainer, AppSearchForm} from '../../components';
import {keyExtractor, refreshControl} from '../../utils/flatlist';

const Screen = ({locationLoading, locations, doGetLocations}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      doGetLocations();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item}) => <></>;

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
      <AppContainer start containerStyle={styles.container}>
        <FlatList
          refreshControl={refreshControl(locationLoading, doGetLocations)}
          data={searchText.length > 0 ? searchResult : locations}
          keyExtractor={keyExtractor('location')}
          renderItem={renderItem}
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
