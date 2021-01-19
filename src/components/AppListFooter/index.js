import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';

const AppListFooter = ({text = '----------End Of List----------'}) => {
  return (
    <View style={{height: 100, justifyContent: 'center'}}>
      <Text style={{textAlign: 'center'}}>{text}</Text>
    </View>
  );
};

export default AppListFooter;
