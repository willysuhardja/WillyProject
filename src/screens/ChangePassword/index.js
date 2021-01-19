import {connect} from 'react-redux';
import {doChangePassword} from '../../features/AccoutManagement/redux/actions';
import {getLoading} from '../../features/AccoutManagement/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state, 'changePassword'),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doChangePassword: (data) => dispatch(doChangePassword(data)),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const ChangePasswordScreen = connectRedux(Screen);

export default ChangePasswordScreen;
