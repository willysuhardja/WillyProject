import React, {Fragment, useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {DataTable} from 'react-native-paper';
import {
  AppButton,
  AppContainer,
  AppListFooter,
  AppSearchForm,
} from '../../components';
import screenNames from '../../features/Location/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import {LocationItem} from './components/LocationItem';

const Screen = ({
  loading,
  localDetails,
  navigation,
  doUpdateQtyBatch,
  route: {
    params: {id: locationId, name: locationName},
  },
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [formQty, setFormQty] = useState([]);

  // const onChangeSearch = (query: string) => setSearchQuery(query);

  const _onQtyChange = (text, itemID) => {
    const newForm = localDetails.map((item, index) => {
      return {
        id: item.id,
        qty1:
          item.id === itemID
            ? text
            : formQty[index]?.qty1 || item.qty1.toString(),
      };
    });
    setFormQty(newForm);
  };

  useEffect(() => {
    const bootstrap = () => {
      getLocationDetail();
    };

    bootstrap();
  }, []);

  const getLocationDetail = () => {};

  const _onSavePressed = () => {
    doUpdateQtyBatch(locationId, formQty)
      .then(() => {
        navigation.navigate(screenNames.detail, {
          id: locationId,
          name: locationName,
        });
      })
      .catch((error) => {
        Alert.alert('Error', 'Sesuatu berjalan salah');
      });
  };

  const renderItem = ({item, index}) => (
    <LocationItem
      id={item.id}
      sku={item.sku}
      qty1={item.qty1}
      qtyValue={formQty[index]?.qty1}
      onQtyChange={_onQtyChange}
      description={item.skuDesc}
    />
  );

  return (
    <Fragment>
      <AppSearchForm
        style={styles.searchForm}
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['sku', 'description', 'skuDesc']}
        placeholder="Search Item"
        list={localDetails}
      />
      <AppContainer start containerStyle={styles.container}>
        <DataTable style={{flex: 1}}>
          <DataTable.Header>
            <DataTable.Title>SKU</DataTable.Title>
            <DataTable.Title numeric>Last Stock</DataTable.Title>
            <DataTable.Title numeric>QTY 1</DataTable.Title>
          </DataTable.Header>
          <FlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{width: '100%'}}
            refreshControl={refreshControl(loading, getLocationDetail)}
            data={searchText.length > 0 ? searchResult : localDetails}
            keyExtractor={keyExtractor('location')}
            renderItem={renderItem}
            ListFooterComponent={<AppListFooter />}
          />
        </DataTable>
        <>
          <AppButton
            loading={loading}
            disabled={loading}
            onPress={_onSavePressed}
            mode="contained">
            Save
          </AppButton>
        </>
      </AppContainer>
    </Fragment>
  );
};

export default Screen;

const styles = {
  container: {
    marginTop: 10,
    padding: 0,
  },
  searchForm: {position: 'relative', top: 0},
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    bottom: 12,
    right: 12,
    backgroundColor: DefaultTheme.colors.primary,
  },
};
