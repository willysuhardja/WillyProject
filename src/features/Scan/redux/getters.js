export const getLocation = (state) => state.scan.location;
export const getLocations = (state) => state.scan.locations;
export const getProductDetail = (state) => state.scan.productDetail;
export const getLoading = (state, type = 'scan') =>
  state.scan[`${type}Loading`];
export const getError = (state, type = 'scan') => state.scan[`${type}Error`];
