export const getUserToken = (state) => state.auth.token;
export const getBranch = (state) => state.auth.branch;
export const getMainApi = (state) => state.auth.mainApi;
export const getGoldApi = (state) => state.auth.goldApi;
export const getBranches = (state) => state.auth.branchesList;
export const getLoading = (state, type = 'login') =>
  state.auth[`${type}Loading`];
