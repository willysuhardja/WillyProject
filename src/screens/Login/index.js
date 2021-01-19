import {connect} from 'react-redux';
import {doLogin} from '../../features/Auth/redux/actions';
import {getLoading} from '../../features/Auth/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state, 'login'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doLogin: (username, password) => dispatch(doLogin(username, password)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const LoginScreen = connectRedux(Screen);

export default LoginScreen;
