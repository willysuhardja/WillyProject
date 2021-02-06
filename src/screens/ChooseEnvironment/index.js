import {connect} from 'react-redux';
import {setEnvirontment} from '../../features/Auth/redux/actions';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEnvirontment: (env) => dispatch(setEnvirontment(env)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const ChooseEnvironmentScreen = connectRedux(Screen);

export default ChooseEnvironmentScreen;
