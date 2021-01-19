import React, {createContext, useContext} from 'react';
import {ScrollContextProvider} from './Provider';

export const ScrollContext = createContext({
  opacity: 0,
  maxOffset: 0,
  offset: 0,
  titleShowing: false,
  updateOffset: (val) => {},
});

export const useScroller = () => useContext(ScrollContext);

export const withScrollContext = (Component) => (props) => {
  return (
    <ScrollContextProvider>
      <Component {...props} />
    </ScrollContextProvider>
  );
};
