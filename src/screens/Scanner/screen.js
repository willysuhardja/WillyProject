'use strict';
import React, {PureComponent} from 'react';
import {Keyboard, StyleSheet, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Avatar, Checkbox, Switch} from 'react-native-paper';
import {AppButton, AppContainer, AppTextInput} from '../../components';
import {DefaultTheme} from '../../theme';
import Slider from '@react-native-community/slider';
import BarcodeMask from 'react-native-barcode-mask';
import {SCAN_RETURN_BARCODE, SCAN_TO_PRODUCT_DETAIL} from '../../constant';

const PendingView = () => (
  <View style={styles.pendingView}>
    <Text>Waiting</Text>
  </View>
);

class Screen extends PureComponent {
  state = {
    barcode: '',
    zoomLevel: 0,
    isSwitchOn: false,
    searching: true,
    keyboardShow: false,
  };

  _onToogleSwitch = () =>
    this.setState({
      isSwitchOn: !this.state.isSwitchOn,
    });

  _onBarcodeChanged = (barcode) => this.setState({barcode});

  _onBarcodeRead = (scanResult) => {
    const {route} = this.props;

    const {
      params: {barcodeTypesIgnore = []},
    } = route || {};

    const barcodes = scanResult.barcodes.filter((barcode) => {
      return (
        barcode.type !== 'UNKNOWN_FORMAT' &&
        !barcodeTypesIgnore.includes(barcode.type)
      );
    });

    if (barcodes.length > 0) {
      const barcodeData = barcodes[0];
      this._onBarcodeSubmit(barcodeData.data);
    }
  };

  _onBarcodeSubmit = (barcode = this.state.barcode) => {
    const {navigation, route} = this.props;
    const {
      params: {mode, redirect},
    } = route || {};
    this.setState(
      {
        barcode: barcode,
        searching: false,
      },
      () => {
        if (mode === SCAN_TO_PRODUCT_DETAIL) {
          console.log('scan to product detail');
        } else if (mode === SCAN_RETURN_BARCODE) {
          navigation.navigate(redirect, {
            barcode: barcode,
          });
        }
      },
    );
  };

  _keyboardDidShow = () => this.setState({keyboardShow: true});
  _keyboardDidHide = () => this.setState({keyboardShow: false, barcode: ''});

  componentDidMount = () => {
    const {navigation} = this.props;
    this._unsubscribeNavigationListener = navigation.addListener(
      'focus',
      () => {
        if (!this.state.searching) {
          this.setState({
            searching: true,
            barcode: '',
          });
        }
      },
    );
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  };

  componentWillUnmount = () => {
    this._unsubscribeNavigationListener();
    this.keyboardDidHideListener.remove();
    this.keyboardDidShowListener.remove();
  };

  render() {
    const {
      isSwitchOn,
      zoomLevel,
      barcode,
      searching,
      keyboardShow,
    } = this.state;
    const {
      route: {
        params = {
          barcodeTypes: [
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.QR_CODE,
          ],
        },
      },
    } = this.props;
    return (
      <View style={styles.container}>
        {searching ? (
          <RNCamera
            style={[styles.preview, keyboardShow && {flex: 1}]}
            type={RNCamera.Constants.Type.back}
            flashMode={isSwitchOn ? 'torch' : 'off'}
            captureAudio={false}
            googleVisionBarcodeType={
              params.barcodeTypes && params.barcodeTypes[0]
            }
            zoom={zoomLevel}
            onGoogleVisionBarcodesDetected={
              keyboardShow ? null : this._onBarcodeRead
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
        ) : (
          <View style={[styles.preview, keyboardShow && {flex: 1}]} />
        )}
        <AppContainer
          wrapperStyle={keyboardShow ? {flex: 3} : {flex: 1}}
          containerStyle={[styles.bottomWrapper]}>
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
          <View style={styles.checkFormContainer}>
            <Switch value={isSwitchOn} onValueChange={this._onToogleSwitch} />
          </View>
          <View style={styles.barcodePreview}>
            <Avatar.Icon icon="barcode-scan" />
            <View style={styles.input}>
              {searching && (
                <AppTextInput
                  autoFocus={true}
                  placeholder="Input Manual"
                  value={barcode}
                  onSubmitEditing={() => this._onBarcodeSubmit(barcode)}
                  onChangeText={this._onBarcodeChanged}
                />
              )}
            </View>
          </View>
          <AppButton
            onPress={() => this._onBarcodeSubmit(barcode)}
            disabled={!barcode}
            mode="contained">
            Submit
          </AppButton>
        </AppContainer>
      </View>
    );
  }
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  checkFormContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {flex: 1, marginLeft: 10},
  bottomWrapper: {
    minHeight: 100,
    alignItems: 'flex-end',
    backgroundColor: DefaultTheme.colors.surface,
  },
  slider: {width: '100%', height: 40},
  pendingView: {
    flex: 1,
    backgroundColor: DefaultTheme.colors.transparent1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
