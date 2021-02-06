import config from '../../../config';

export const initialState = {
  token: null,
  loginLoading: false,
  loginSuccess: false,
  loginError: false,
  branch: null,
  branchesList: [],
  getBranchesLoading: false,
  getBranchesSuccess: false,
  getBranchesError: false,
  mainApi: config.baseURL,
  mainApiList: [],
  getMainApisLoading: false,
  getMainApisSuccess: false,
  getMainApisError: false,
  goldApi: config.goldURL,
  goldApiList: [],
  getGoldApisLoading: false,
  getGoldApisSuccess: false,
  getGoldApisError: false,
};
