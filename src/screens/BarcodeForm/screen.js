import React, {Fragment, useEffect} from 'react';
import {AppContainer, AppBasicHeader} from '../../components';
import screenNames from '../../features/ProductCheck/navigation/screenNames';
import {DefaultTheme} from '../../theme';
import BarcodeForm from './components/BarcodeForm';
const Screen = ({navigation, route}) => {
  const {params} = route;

  const barcode = params?.barcode || '';

  const _onSubmit = (data) => {
    navigation.navigate(screenNames.detail, {
      barcode: data.barcode,
    });
  };

  const _onButtonScanTapped = () => {
    navigation.navigate(screenNames.camera);
  };

  useEffect(() => {}, []);

  return (
    <Fragment>
      <AppBasicHeader app />
      <AppContainer
        start
        containerStyle={{
          backgroundColor: DefaultTheme.colors.surface,
        }}>
        <BarcodeForm
          defaultValues={{barcode}}
          onSubmit={_onSubmit}
          onButtonScanTapped={_onButtonScanTapped}
        />
      </AppContainer>
    </Fragment>
  );
};

export default Screen;
