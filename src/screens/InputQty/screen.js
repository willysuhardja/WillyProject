import React, {useEffect, useLayoutEffect} from 'react';
import {Alert, ScrollView, StatusBar} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {AppBasicHeader, AppContainer, AppLoadingBasic} from '../../components';
import {DefaultTheme} from '../../theme';
import QtyForm from './components/QtyForm';

const Screen = ({
  productLoading,
  addScanLoading,
  productDetail,
  doVerifyScanItem,
  doAddScanItem,
  ...props
}) => {
  const {
    navigation: {goBack},
    route: {
      params: {barcode},
    },
  } = props;

  useEffect(() => {
    const bootstrap = () => {
      doVerifyBarcode();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    StatusBar.setBackgroundColor(DefaultTheme.colors.primary);
  }, []);

  const doVerifyBarcode = () => {
    doVerifyScanItem(barcode).catch((error) => {
      Alert.alert('Error', error.message, [
        {
          tetx: 'Ok',
          onPress: goBack,
          style: {
            color: 'red',
          },
        },
      ]);
    });
  };

  const _onSubmit = ({qty}) => {
    const data = {
      barcode: barcode,
      qty1: qty,
      qty2: productDetail.last_stock,
      sku: productDetail.sku,
      tillCode: productDetail.till_code,
      skuDesc: productDetail.skudesc,
    };

    doAddScanItem(data)
      .then(() => {
        goBack();
      })
      .catch((error) => {
        Alert.alert('Error', error.message, [
          {
            tetx: 'Ok',
          },
        ]);
      });
  };

  if (productLoading) {
    return <AppLoadingBasic />;
  }

  return (
    <ScrollView>
      <AppBasicHeader />
      <Card style={styles.cardItem}>
        <Card.Content>
          <Text style={styles.title}>{productDetail.skudesc}</Text>
          <Text>{productDetail.sku}</Text>
        </Card.Content>
      </Card>
      <AppContainer containerStyle={styles.container}>
        <QtyForm onSubmit={_onSubmit} loading={addScanLoading} />
      </AppContainer>
    </ScrollView>
  );
};

export default Screen;

const styles = {
  container: {
    marginTop: 5,
    paddingTop: 5,
  },
  title: {
    fontWeight: 'bold',
  },
  cardItem: {
    width: '90%',
    marginTop: -140,
    alignSelf: 'center',
    elevation: 4,
  },
};
