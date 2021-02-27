export const getMenu = (state) => state.home.menu;
export const getLoading = (state, type = 'menu') =>
  state.home[`${type}Loading`];
