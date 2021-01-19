import {connect} from 'react-redux';
import {setBranch, doGetBranches} from '../../features/Auth/redux/actions';
import {getLoading, getBranches} from '../../features/Auth/redux/getters';
import Screen from './screen';

const mapStateToProps = (state) => {
  return {
    loading: getLoading(state, 'getBranches'),
    branches: getBranches(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setBranch: (branch) => dispatch(setBranch(branch)),
    doGetBranches: () => dispatch(doGetBranches()),
  };
};

const connectRedux = connect(mapStateToProps, mapDispatchToProps);

const ChooseBranchScreen = connectRedux(Screen);

export default ChooseBranchScreen;
