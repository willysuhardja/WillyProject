import React, {Fragment} from 'react';
import {AppBasicHeader, AppSearchForm} from '../../components';

const Screen = () => {
  return (
    <Fragment>
      <AppBasicHeader />
      <AppSearchForm
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['name', 'initial']}
        placeholder="Search Store"
        list={[]}
      />
      <AppContainer start containerStyle={styles.container}>
        <FlatList
          refreshControl={refreshControl(loading, doGetBranches)}
          data={searchText.length > 0 ? searchResult : branches}
          keyExtractor={keyExtractor('store')}
          renderItem={renderItem}
        />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;
