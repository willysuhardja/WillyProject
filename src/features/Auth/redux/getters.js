export const getUserToken = (state) => state.auth.token;
export const getBranch = (state) => state.auth.branch;
export const getBranches = (state) => state.auth.branchesList;
export const getLoading = (state, type = 'login') =>
  state.auth[`${type}Loading`];
