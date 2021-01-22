import React, {Fragment, useEffect, useState, useLayoutEffect} from 'react';
import {Alert, FlatList} from 'react-native';
import {DataTable, Text, TouchableRipple} from 'react-native-paper';
import {
  AppButton,
  AppContainer,
  AppListFooter,
  AppSearchForm,
} from '../../components';
import {default as scanScreenNames} from '../../features/Scan/navigation/screenNames';
import {default as locationScreenNames} from '../../features/Location/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import {LocationItem} from './components/LocationItem';

const Screen = ({
  locationLoading,
  uploadLoading,
  details,
  localDetails,
  doGetLocationDetail,
  doUploadLocation,
  navigation,
  route: {
    params: {mode, name: locationName, id: locationId},
  },
}) => {
  const list = mode === 'history' ? details : localDetails;
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const bootstrap = () => {
      getLocationDetail();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (mode === 'local') {
      navigation.setOptions({
        headerRight: () => (
          <TouchableRipple
            style={{padding: parseInt(`${5}`, 0)}}
            onPress={() =>
              navigation.navigate(scanScreenNames.index, {
                screen: scanScreenNames.item,
                params: {barcode: locationName},
              })
            }>
            <Text style={{color: DefaultTheme.colors.white}}>Add Item</Text>
          </TouchableRipple>
        ),
      });
    }
  }, [mode, locationName, navigation]);

  const getLocationDetail = () => {
    if (mode === 'history') {
      doGetLocationDetail(locationName);
    }
  };

  const _onEditPressed = () => {
    navigation.navigate(locationScreenNames.edit, {
      id: locationId,
      name: locationName,
    });
  };

  const _onUploadPressed = () => {
    doUploadLocation(locationId, locationName)
      .then(() => {
        navigation.navigate(locationScreenNames.location, {
          refresh: true,
        });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const renderItem = ({item}) => (
    <LocationItem
      sku={item.sku}
      qty1={item.qty1 || item.qty_1}
      qty2={item.qty2 || item.qty_2}
      description={item.skuDesc || item.description}
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
        list={list}
      />
      <AppContainer start containerStyle={styles.container}>
        <DataTable style={{flex: 1}}>
          <DataTable.Header>
            <DataTable.Title>SKU</DataTable.Title>
            <DataTable.Title numeric>Last Stock</DataTable.Title>
            <DataTable.Title numeric>QTY 1</DataTable.Title>
          </DataTable.Header>
          <FlatList
            contentContainerStyle={{width: '100%'}}
            refreshControl={refreshControl(locationLoading, getLocationDetail)}
            data={searchText.length > 0 ? searchResult : list}
            keyExtractor={keyExtractor('location')}
            renderItem={renderItem}
            ListFooterComponent={<AppListFooter />}
          />
        </DataTable>
        {mode === 'local' && (
          <>
            <AppButton
              onPress={_onEditPressed}
              mode="text"
              disabled={uploadLoading}
              color={DefaultTheme.colors.secondary}>
              Edit
            </AppButton>
            <AppButton
              onPress={_onUploadPressed}
              mode="contained"
              disabled={localDetails.length === 0 || uploadLoading}
              loading={uploadLoading}>
              Upload
            </AppButton>
          </>
        )}
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
