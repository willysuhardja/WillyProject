'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Avatar, Switch, Title} from 'react-native-paper';
import {AppContainer, AppParagraph} from '../../components';
import {DefaultTheme} from '../../theme';
import Slider from '@react-native-community/slider';
import BarcodeMask from 'react-native-barcode-mask';
import {default as productScreen} from '../../features/ProductCheck/navigation/screenNames';
import {SCAN_RETURN_BARCODE, SCAN_TO_PRODUCT_DETAIL} from '../../constant';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: DefaultTheme.colors.transparent1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text>Waiting</Text>
  </View>
);

class Screen extends PureComponent {
  state = {
    barcode: '',
    zoomLevel: 0,
    isSwitchOn: false,
    searching: true,
  };

  onToogleSwitch = () =>
    this.setState({
      isSwitchOn: !this.state.isSwitchOn,
    });

  _onBarcodeRead = (scanResult) => {
    const {navigation, route} = this.props;

    const {params} = route || {};

    const barcodes = scanResult.barcodes.filter(
      (barcode) => barcode.type !== 'UNKNOWN_FORMAT',
    );

    if (barcodes.length > 0) {
      const barcodeData = barcodes[0];
      this.setState(
        {
          barcode: barcodeData.data,
          searching: false,
        },
        () => {
          if (params?.mode === SCAN_TO_PRODUCT_DETAIL) {
            navigation.navigate(productScreen.detail, {
              barcode: barcodeData.data,
            });
          } else if (params?.mode === SCAN_RETURN_BARCODE) {
            navigation.navigate(params?.redirect, {
              barcode: barcodeData.data,
            });
          }
        },
      );
    }
  };

  componentDidMount = () => {
    const {navigation} = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      if (!this.state.searching) {
        this.setState({
          searching: true,
          barcode: '',
        });
      }
    });
  };

  componentWillUnmount = () => {
    this._unsubscribe();
  };

  render() {
    const {isSwitchOn, zoomLevel, barcode, searching} = this.state;
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={isSwitchOn ? 'torch' : 'off'}
          captureAudio={false}
          zoom={zoomLevel}
          onGoogleVisionBarcodesDetected={
            searching ? this._onBarcodeRead : null
          }
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          maxZoom={0.4}>
          {({camera, status}) => {
            if (status !== 'READY') {
              return <PendingView />;
            }

            return <BarcodeMask height={'100%'} width={'100%'} />;
          }}
        </RNCamera>
        <AppContainer containerStyle={styles.bottomWrapper}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={0.4}
            onValueChange={(e) =>
              this.setState({
                zoomLevel: e,
              })
            }
            minimumTrackTintColor={DefaultTheme.colors.primary}
            maximumTrackTintColor={DefaultTheme.colors.disabled}
          />
          <Switch value={isSwitchOn} onValueChange={this.onToogleSwitch} />
          <View style={styles.barcodePreview}>
            <Avatar.Icon icon="barcode-scan" />
            {barcode === '' ? (
              <AppParagraph>The barcode will be displayed here</AppParagraph>
            ) : (
              <Title>{barcode}</Title>
            )}
          </View>
        </AppContainer>
      </View>
    );
  }

  takePicture = async function (camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };
}

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  barcodePreview: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomWrapper: {
    minHeight: 100,
    alignItems: 'flex-end',
    backgroundColor: DefaultTheme.colors.surface,
  },
  slider: {width: '100%', height: 40},
});
