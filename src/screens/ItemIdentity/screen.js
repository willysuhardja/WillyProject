import React, {Fragment, useEffect, useState} from 'react';
import {Alert, Dimensions, View, ScrollView, FlatList} from 'react-native';
import {
  Card,
  DataTable,
  Modal,
  Portal,
  Text,
  Title,
  TouchableRipple,
} from 'react-native-paper';
import {AppContainer, AppBasicHeader, AppLoadingBasic} from '../../components';
import screenNames from '../../features/Identification/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import {refreshControl} from '../../utils/flatlist';
const Screen = ({
  navigation,
  route,
  productLoading,
  productDetail,
  productIdentification,
  doGetProductIdentity,
}) => {
  const {barcode} = route.params;
  console.log(productIdentification);
  const [init, setInit] = useState(true);
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const getProductAsync = () => {
    doGetProductIdentity(barcode)
      .then(() => {
        setInit(false);
      })
      .catch((error) => {
        Alert.alert('Error', 'Please make sure barcode is correct', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate(screenNames.scanner, {
                barcode,
              });
            },
          },
        ]);
      });
  };

  useEffect(() => {
    const bootstrap = () => {
      getProductAsync();
    };

    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (productLoading && init) {
    return <AppLoadingBasic />;
  }

  return (
    <Fragment>
      <ScrollView
        refreshControl={refreshControl(productLoading, getProductAsync)}
        style={{minHeight: '100%'}}>
        <AppBasicHeader />
        <Card style={styles.cardCover} onPress={showModal}>
          <Card.Cover
            style={{
              alignSelf: 'center',
              resizeMode: 'cover',
              height: 200,
              aspectRatio: 1,
            }}
            source={{uri: productDetail.image}}
          />
          <Card.Content>
            <Title style={{textAlign: 'left'}}>{productDetail.skudesc}</Title>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View>
                <Text style={{fontSize: 16}}>{productDetail.sku}</Text>
                {/* <Text style={{fontSize: 16, fontWeight: 'bold'}}>
                  SOH = {productDetail.last_stock}
                </Text> */}
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{fontSize: 16}}>{productDetail.division}</Text>
                <Text style={{fontSize: 16}}>{productDetail.category}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
        <AppContainer containerStyle={styles.container}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Location</DataTable.Title>
              <DataTable.Title numeric>Qty</DataTable.Title>
            </DataTable.Header>
            {productIdentification?.map((item) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{item.location_name}</DataTable.Cell>
                  <DataTable.Cell numeric>{item.qty}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </AppContainer>
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={true}
          contentContainerStyle={styles.modalContainer}>
          <Text style={{textAlign: 'center'}}>Tap Anywhere to close</Text>
          <TouchableRipple style={{flex: 1}} onPress={hideModal}>
            <Card.Cover
              style={{
                resizeMode: 'center',
                width: '100%',
                flex: 1,
              }}
              source={{uri: productDetail.image}}
            />
          </TouchableRipple>
        </Modal>
      </Portal>
    </Fragment>
  );
};

export default Screen;

const styles = {
  container: {
    marginTop: 20,
    backgroundColor: DefaultTheme.colors.surface,
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    elevation: 1,
    paddingHorizontal: 0,
    paddingBottom: 0,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  cardCover: {
    marginTop: -100,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  modalContainer: {
    backgroundColor: 'white',
    marginHorizontal: 10,
    padding: 2,
    marginVertical: 20,
    flex: 1,
  },
  listItem: {width: Dimensions.get('screen').width},
};
