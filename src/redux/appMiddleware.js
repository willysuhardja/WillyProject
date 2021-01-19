import {applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

const appMiddlewares = applyMiddleware(...middlewares);

export default appMiddlewares;
