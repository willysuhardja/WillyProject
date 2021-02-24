import {withTheme} from 'react-native-paper';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {
  setBluetoothAlreadyPairedList,
  setBluetoothEnabled,
  setBluetoothFoundedList,
  setBluetoothPaired,
} from '../../features/BluetoothPrinter/redux/actions';
import Screen from './screen';

const mapStateToProps = (state) => ({
  isBluetoothEnabled: state.bluetooth.isBluetoothEnabled,
  alreadyPairedList: state.bluetooth.alreadyPairedList,
  foundedList: state.bluetooth.foundedList,
  pairedDevices: state.bluetooth.pairedDevices,
});

const mapDispatchToProps = (dispatch) => ({
  setBluetoothEnabled: (enabled) => dispatch(setBluetoothEnabled(enabled)),
  setBluetoothPaired: (list) => dispatch(setBluetoothPaired(list)),
  setBluetoothFoundedList: (list) => dispatch(setBluetoothFoundedList(list)),
  setBluetoothAlreadyPairedList: (list) =>
    dispatch(setBluetoothAlreadyPairedList(list)),
});

const withRedux = connect(mapStateToProps, mapDispatchToProps);

const BluetoothPrintSettingScreen = compose(withTheme, withRedux)(Screen);

export default BluetoothPrintSettingScreen;
