export const getProfile = (state) => state.account.profile;
export const getLoading = (state, type = 'profile') =>
  state.account[`${type}Loading`];
