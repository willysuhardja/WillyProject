import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {FAB} from 'react-native-paper';
import {makeStyles} from './style';

import Geolocation from '@react-native-community/geolocation';
import {DefaultTheme} from '../../theme';

export default function Screen({theme}) {
  const styles = makeStyles(theme);

  const [region, setRegion] = useState({
    latitude: -6.949597,
    longitude: 107.634479,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });

  const onLocationPressed = () => {
    Geolocation.getCurrentPosition((data) => {
      setRegion({
        ...region,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={setRegion}>
        <Marker
          coordinate={{
            latitude: -6.919597,
            longitude: 107.634479,
          }}
        />
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
        />

        <Polyline
          coordinates={[
            {
              latitude: region.latitude,
              longitude: region.longitude,
            },
            {
              latitude: -6.919597,
              longitude: 107.634479,
            },
          ]}
        />
      </MapView>
      <FAB
        style={{
          position: 'absolute',
          right: 20,
          bottom: 20,
          backgroundColor: DefaultTheme.colors.white,
        }}
        color={DefaultTheme.colors.primary}
        icon="map-marker"
        onPress={onLocationPressed}
      />
    </View>
  );
}
