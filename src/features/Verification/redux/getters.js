export const getVerifications = (state) => state.verification.verifications;
export const getLoading = (state, type = 'scan') =>
  state.verification[`${type}Loading`];
export const getError = (state, type = 'scan') =>
  state.verification[`${type}Error`];
