import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Coordinates for no fishing and fishing allowed zones
  const noFishingZone = {
    latitude: 45.55329806395808,
    longitude: 13.732330327892162,
  };

  const fishingAllowedZone = {
    latitude: 45.546860,
    longitude: 13.719272,
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    }

    getCurrentLocation();
  }, []);

  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 45.5514, // center of the map between zones
          longitude: 13.7295,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
      >
        {/* No Fishing Zone (Red Circle) */}
        <Circle
          center={noFishingZone}
          radius={500} // Change this value to adjust the size of the zone
          strokeWidth={2}
          strokeColor="red"
          fillColor="rgba(255, 0, 0, 0.3)" // Red with transparency
        />
        
        {/* Fishing Allowed Zone (Green Circle) */}
        <Circle
          center={fishingAllowedZone}
          radius={500} // Change this value to adjust the size of the zone
          strokeWidth={2}
          strokeColor="green"
          fillColor="rgba(0, 255, 0, 0.3)" // Green with transparency
        />

        {/* Optionally add markers */}
        <Marker coordinate={noFishingZone} title="No Fishing Zone" />
        <Marker coordinate={fishingAllowedZone} title="Fishing Allowed Zone" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default MapScreen;
