import {connect} from 'react-redux';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const BarcodeFromScreen = connectRedux(Screen);

export default BarcodeFromScreen;