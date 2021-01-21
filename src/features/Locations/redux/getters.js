export const getLocations = (state) => state.location.locations;
export const getLoading = (state, type = 'scan') =>
  state.location[`${type}Loading`];
export const getError = (state, type = 'scan') =>
  state.location[`${type}Error`];
