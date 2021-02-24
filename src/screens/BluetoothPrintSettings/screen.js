import React, {useEffect, useState} from 'react';
import {Alert, ScrollView} from 'react-native';
import {Switch, Text} from 'react-native-paper';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from 'react-native-bluetooth-escpos-printer';

import moment from 'moment';

import {
  AppButton,
  AppContainer,
  AppLoadingBasic,
  AppLoadingDialog,
} from '../../components';
import {makeStyles} from './style';

import BluetoothDeviceList from './components/BluetoothDeviceList';
import ConnectedBluetoothDevices from './components/ConnectedBluetoothDevice';

const Screen = ({
  isBluetoothEnabled,
  alreadyPairedList,
  foundedList,
  pairedDevices,
  setBluetoothEnabled,
  setBluetoothPaired,
  setBluetoothFoundedList,
  setBluetoothAlreadyPairedList,
  navigation,
  theme,
}) => {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [connectionLoading, setConnectionLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const styles = makeStyles(theme);

  useEffect(() => {
    checkBluetoothIsEnabled();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onToggleSwitch = () => {
    const newValue = !isSwitchOn;

    if (newValue) {
      doEnableBluetooth();
    } else {
      doDisabledBluetooth();
    }

    setIsSwitchOn(!isSwitchOn);
  };

  const checkBluetoothIsEnabled = () => {
    BluetoothManager.isBluetoothEnabled().then(
      (enabled) => {
        setBluetoothEnabled(enabled);
        setConnectionLoading(false);
      },
      (error) => {
        Alert.alert(error);
      },
    );
  };

  const doEnableBluetooth = () => {
    BluetoothManager.enableBluetooth().then(
      (r) => {
        const paired = r.map((item) => JSON.parse(item));
        setBluetoothEnabled(true);
        setBluetoothAlreadyPairedList(paired);
      },
      (error) => {
        console.log(JSON.stringify(error));
      },
    );
  };

  const doDisabledBluetooth = () => {
    BluetoothManager.disableBluetooth().then(
      () => {
        setBluetoothEnabled(false);
      },
      (error) => {
        Alert.alert(error);
      },
    );
  };

  const doScanDevices = () => {
    setSearchLoading(true);
    BluetoothManager.scanDevices()
      .then((result) => {
        const {found, paired} = JSON.parse(result);
        if (paired.length > 0) {
          setBluetoothAlreadyPairedList(paired);
        }
        const foundedListMap = found.map((item) => ({
          ...item,
          name: item.name || 'NO NAME',
        }));
        setBluetoothFoundedList(foundedListMap);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSearchLoading(false);
      });
  };

  const onItemPressed = (item) => {
    setConnectLoading(true);
    BluetoothManager.connect(item.address) // the device address scanned.
      .then((s) => {
        Alert.alert('Connected');
        setBluetoothPaired(item);
      })
      .catch((e) => {
        Alert.alert('Error');
      })
      .finally(() => {
        setConnectLoading(false);
      });
  };

  const onPrintSample = async () => {
    await BluetoothEscposPrinter.printerInit();
    await BluetoothEscposPrinter.printerLeftSpace(0);

    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.CENTER,
    );
    await BluetoothEscposPrinter.setBlob(0);
    await BluetoothEscposPrinter.printText('Logo\r\n', {
      codepage: 0,
      widthtimes: 3,
      heigthtimes: 3,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.setBlob(0);
    await BluetoothEscposPrinter.printText('Aplikasi\r\n', {
      codepage: 0,
      widthtimes: 0,
      heigthtimes: 0,
      fonttype: 1,
    });
    await BluetoothEscposPrinter.printerAlign(
      BluetoothEscposPrinter.ALIGN.LEFT,
    );
    await BluetoothEscposPrinter.printText('customer : Aden Trisna\r\n', {});
    await BluetoothEscposPrinter.printText('code : xsd201909210000001\r\n', {});
    await BluetoothEscposPrinter.printText(
      'date : ' + moment(new Date()).format('YYYY-MM-DD HH-mm-ss') + '\r\n',
      {},
    );
    await BluetoothEscposPrinter.printText('code : 18664896621\r\n', {});
    await BluetoothEscposPrinter.printText(
      '--------------------------------\r\n',
      {},
    );
    let columnWidths = [12, 6, 6, 8];
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['name', 'qty', 'price', 'price'],
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['Jambu', '1', '32000', '32000'],
      {},
    );
    await BluetoothEscposPrinter.printText('\r\n', {});
    await BluetoothEscposPrinter.printColumn(
      columnWidths,
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.CENTER,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['Mangga', '1', '32000', '32000'],
      {},
    );
    await BluetoothEscposPrinter.printText('\r\n', {});
    await BluetoothEscposPrinter.printText(
      '--------------------------------\r\n',
      {},
    );
    await BluetoothEscposPrinter.printColumn(
      [12, 8, 12],
      [
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.LEFT,
        BluetoothEscposPrinter.ALIGN.RIGHT,
      ],
      ['Total', '2', '64000'],
      {},
    );
    await BluetoothEscposPrinter.printQRCode(
      'Halo dari QR',
      280,
      BluetoothEscposPrinter.ERROR_CORRECTION.L,
    );
    await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
    await BluetoothEscposPrinter.printBarCode(
      '123456789012',
      BluetoothEscposPrinter.BARCODETYPE.JAN13,
      3,
      120,
      0,
      2,
    );
    await BluetoothEscposPrinter.printText('\r\n\r\n\r\n', {});
  };

  if (!isBluetoothEnabled) {
    return (
      <AppContainer center>
        <Text style={styles.disabledText}>Bluetooth is Disabled</Text>
        <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
      </AppContainer>
    );
  }

  if (connectionLoading) {
    return <AppLoadingBasic />;
  }

  return (
    <AppContainer fluid>
      <AppButton onPress={doScanDevices} loading={searchLoading}>
        {searchLoading
          ? 'Searching ...'
          : foundedList.length > 0
          ? 'Re-scan'
          : 'Scan'}
      </AppButton>
      {pairedDevices !== null && (
        <ConnectedBluetoothDevices paired={pairedDevices} />
      )}
      <ScrollView>
        <BluetoothDeviceList
          alreadyPairedList={alreadyPairedList}
          foundedList={foundedList}
          onItemPressed={onItemPressed}
        />
      </ScrollView>
      <AppButton
        onPress={onPrintSample}
        disabled={pairedDevices === null}
        mode="contained">
        Print Sample
      </AppButton>

      <AppLoadingDialog
        visible={connectLoading}
        dismissable={false}
        title="Connecting ..."
      />
    </AppContainer>
  );
};

export default Screen;
