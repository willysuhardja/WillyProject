import React, {Fragment, useEffect} from 'react';
import {Alert} from 'react-native';
import {Card, Title} from 'react-native-paper';
import {
  AppBasicHeader,
  AppContainer,
  AppLoadingBasic,
  AppParagraph,
} from '../../components';
import QtyForm from './components/QtyForm';

const Screen = ({
  productLoading,
  productDetail,
  doGetProductDetail,
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
      getProductDetail();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getProductDetail = () => {
    doGetProductDetail(barcode).catch((error) => {
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

  if (productLoading) {
    return <AppLoadingBasic />;
  }

  return (
    <Fragment>
      <AppBasicHeader />
      <Card style={styles.cardItem}>
        <Card.Content>
          <Title>{productDetail.skudesc}</Title>
          <AppParagraph>{productDetail.sku}</AppParagraph>
          <AppParagraph right>
            Last Stock: {productDetail.last_stock}
          </AppParagraph>
        </Card.Content>
      </Card>
      <AppContainer containerStyle={styles.container}>
        <QtyForm />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;

const styles = {
  container: {
    marginTop: 20,
  },
  cardItem: {
    width: '90%',
    marginTop: -110,
    alignSelf: 'center',
    elevation: 4,
  },
};
