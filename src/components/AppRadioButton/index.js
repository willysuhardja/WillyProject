import React from 'react';
import {View} from 'react-native';
import {RadioButton, Text} from 'react-native-paper';

export default function AppRadioButton({value, checked, label, onChange}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <RadioButton
        value={value}
        status={checked ? 'checked' : 'unchecked'}
        onPress={() => onChange(value)}
      />
      <Text>{label}</Text>
    </View>
  );
}
