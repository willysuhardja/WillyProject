export const getStartTime = (state) => state.count.startTime;
export const getEndDuration = (state) => state.count.endDuration;
export const getLocation = (state) => state.count.location;
export const getLoading = (state, type = 'count') =>
  state.count[`${type}Loading`];
