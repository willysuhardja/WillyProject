export const getStartTime = (state) => state.count.startTime;
export const getEndTime = (state) => state.count.endTime;
export const getDuration = (state) => state.count.duration;
export const getLocation = (state) => state.count.location;
export const getLoading = (state, type = 'count') =>
  state.count[`${type}Loading`];
export const getError = (state, type = 'count') => state.count[`${type}Error`];
