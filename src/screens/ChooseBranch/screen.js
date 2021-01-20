import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {
  AppBasicHeader,
  AppButton,
  AppContainer,
  AppSearchForm,
} from '../../components';
import {DefaultTheme} from '../../theme';
import screenNames from '../../features/Main/navigation/screenNames';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import StoreItem from './components/StoreItem';

const Screen = (props) => {
  const {navigation, branches, doGetBranches, loading, setBranch} = props;

  const [activeIndex, setActiveIndex] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      doGetBranches();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = ({item, index}) => (
    <StoreItem
      name={item.name}
      slug={item.initial}
      active={activeIndex === item.id}
      onPress={() => setActiveIndex(item.id)}
    />
  );

  const onChooseStore = () => {
    const activeBranch = branches.find((branch) => branch.id === activeIndex);
    setBranch(activeBranch);
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.replace(screenNames.home);
  };

  return (
    <Fragment>
      <AppBasicHeader app title="Choose Store" />
      <AppSearchForm
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['name', 'initial']}
        placeholder="Search Store"
        list={branches}
      />
      <AppContainer start containerStyle={styles.container}>
        <FlatList
          refreshControl={refreshControl(loading, doGetBranches)}
          data={searchText.length > 0 ? searchResult : branches}
          keyExtractor={keyExtractor('store')}
          renderItem={renderItem}
        />
        <AppButton
          disabled={activeIndex === null}
          mode="contained"
          onPress={onChooseStore}
          loading={loading}>
          Choose
        </AppButton>
      </AppContainer>
    </Fragment>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: DefaultTheme.colors.surface,
    paddingHorizontal: 0,
    paddingBottom: 0,
  },
});
