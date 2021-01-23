import React, {Fragment, useEffect, useState} from 'react';
import {Alert, FlatList} from 'react-native';
import {DataTable} from 'react-native-paper';
import {
  AppButton,
  AppContainer,
  AppListFooter,
  AppLoadingBasic,
  AppSearchForm,
} from '../../components';
import screenNames from '../../features/Verification/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {keyExtractor, refreshControl} from '../../utils/flatlist';
import {LocationItem} from './components/LocationItem';

const Screen = ({
  checkLoading,
  verificationLoading,
  checkVerifications,
  doCheckVerifications,
  doVerification,
  navigation,
  route: {
    params: {name: locationName},
  },
}) => {
  const [searchText, setSearchText] = useState('');
  const [searchResult, setSearchResult] = useState([]);

  const [formFixQty, setFormFixQty] = useState([]);

  // const onChangeSearch = (query: string) => setSearchQuery(query);

  const _onQtyChange = (text, itemID) => {
    const newForm = checkVerifications.map((item, index) => {
      return {
        sku: item.sku,
        qty_fix: item.sku === itemID ? text : formFixQty[index]?.qty_fix,
      };
    });
    setFormFixQty(newForm);
  };

  useEffect(() => {
    const bootstrap = () => {
      getCheckVerifications();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCheckVerifications = () => {
    doCheckVerifications(locationName)
      .then((lengthOfVerification) => {
        if (lengthOfVerification === 0) {
          doVerificationAction();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const doVerificationAction = () => {
    doVerification(locationName, formFixQty)
      .then(() => {
        navigation.navigate(screenNames.verification, {
          refresh: true,
        });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  const _onSavePressed = () => {
    if (formFixQty.length === 0) {
      return Alert.alert('Error', 'Pastikan anda telah mengisi semua qty fix');
    }

    const emptyFixInputs = formFixQty.filter((item) => !item.qty_fix);

    if (emptyFixInputs.length > 0) {
      return Alert.alert(
        'Error',
        'Pastikan anda telah mengecek semua qty fix terisi dengan benar',
      );
    }

    doVerificationAction();
  };

  const renderItem = ({item, index}) => {
    console.log(formFixQty);
    return (
      <LocationItem
        sku={item.sku}
        qty1={item.qty_1}
        qty2={item.qty_2}
        qtyValue={formFixQty[index]?.qty_fix}
        onQtyChange={_onQtyChange}
        description={item.description}
      />
    );
  };

  if (verificationLoading) {
    return <AppLoadingBasic />;
  }

  return (
    <Fragment>
      <AppSearchForm
        style={styles.searchForm}
        setSearchResult={setSearchResult}
        setSearchText={setSearchText}
        searchFields={['sku', 'description', 'skuDesc']}
        placeholder="Search Item"
        list={checkVerifications}
      />
      <AppContainer start containerStyle={styles.container}>
        <DataTable style={{flex: 1}}>
          <DataTable.Header>
            <DataTable.Title>SKU</DataTable.Title>
            <DataTable.Title numeric>Last Stock</DataTable.Title>
            <DataTable.Title numeric>Qty 1</DataTable.Title>
            <DataTable.Title numeric>QTY Fix</DataTable.Title>
          </DataTable.Header>
          <FlatList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{width: '100%'}}
            refreshControl={refreshControl(checkLoading, getCheckVerifications)}
            data={searchText.length > 0 ? searchResult : checkVerifications}
            keyExtractor={keyExtractor('location')}
            renderItem={renderItem}
            ListFooterComponent={<AppListFooter />}
          />
        </DataTable>
        <>
          <AppButton
            loading={checkLoading || verificationLoading}
            disabled={checkLoading || verificationLoading}
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
