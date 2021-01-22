export const getLocations = (state) => state.location.locations;
export const getLocationDetails = (state) => state.location.locationDetails;
export const getLoading = (state, type = 'scan') =>
  state.location[`${type}Loading`];
export const getError = (state, type = 'scan') =>
  state.location[`${type}Error`];
