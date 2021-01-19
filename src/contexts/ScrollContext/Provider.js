import React, {useState} from 'react';
import {ScrollContext} from '.';

const withinLimits = (val, min, max) =>
  val > max ? max : val < min ? min : val;

export const ScrollContextProvider = (props) => {
  const minOffset = 0;
  const maxOffset = 30;

  const [offset, setOffset] = useState(0);
  const [titleShowing, setTitleShowing] = useState(false);
  const [opacity, setOpacity] = useState(0);

  const updateOffset = (val) => {
    setOffset(withinLimits(val, minOffset, maxOffset));
    setTitleShowing(val > maxOffset);
    setOpacity(withinLimits((val * maxOffset) / 1000, 0, 1));
  };

  return (
    <ScrollContext.Provider
      value={{
        opacity: opacity,
        maxOffset: maxOffset,
        offset: offset,
        titleShowing: titleShowing,
        updateOffset: updateOffset,
      }}>
      {props.children}
    </ScrollContext.Provider>
  );
};

export default ScrollContextProvider;
