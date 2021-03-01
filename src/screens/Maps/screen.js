import React, {useState} from 'react';
import {View} from 'react-native';
import MapView from 'react-native-maps';
import {makeStyles} from './style';

export default function Screen({theme}) {
  const styles = makeStyles(theme);

  const [region, setRegion] = useState(null);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
}
