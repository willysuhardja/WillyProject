import React, {Fragment, useEffect, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {AppBasicHeader, AppButton, AppContainer} from '../../components';
import {DefaultTheme} from '../../theme';
import screenNames from '../../features/Main/navigation/screenNames';
import SearchFrom from './components/SearchForm';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import StoreItem from './components/StoreItem';

const Screen = (props) => {
  const {navigation, branches, doGetBranches, loading, setBranch} = props;

  const [activeIndex, setActiveIndex] = useState(null);

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
      slug={item.slug}
      active={activeIndex === index}
      onPress={() => setActiveIndex(index)}
    />
  );

  const onChooseStore = () => {
    setBranch(branches[activeIndex]);
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
    navigation.replace(screenNames.home);
  };

  return (
    <Fragment>
      <AppBasicHeader app title="Choose Store" />
      <SearchFrom loading={loading} />
      <AppContainer start containerStyle={styles.container}>
        <FlatList
          refreshControl={refreshControl(loading, doGetBranches)}
          data={branches}
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
