import React from 'react';
import {Image, View} from 'react-native';

import NoDataImage from './../../assets/nodata.png';

const AppListEmpty = () => {
  return (
    <View style={container}>
      <Image source={NoDataImage} />
    </View>
  );
};

const container = {flex: 1, justifyContent: 'center', alignItems: 'center'};

export default AppListEmpty;
