export const getProductDetail = (state) => state.identification.productDetail;
export const getLoading = (state, type = 'scan') =>
  state.identification[`${type}Loading`];
export const getError = (state, type = 'scan') =>
  state.identification[`${type}Error`];
