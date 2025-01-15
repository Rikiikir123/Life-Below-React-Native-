import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function SeaLifeScannerScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false); // To track the scanning state
  const [randomFish, setRandomFish] = useState<any | null>(null); // To store random fish data
  const cameraRef = useRef<CameraView | null>(null); // Camera reference

  // Fish data, including the seahorse
  const fishData = [
    {
      name: 'Seahorse (Hippocampus guttulatus)',
      image: require('@/assets/images/seahorse.png'),
      details:
        'Seahorses are small marine fishes known for their unique appearance and swimming style. They inhabit shallow coastal waters and seagrass beds. This species is vulnerable due to habitat loss and pollution.',
    },
    {
      name: 'Adriatic Sturgeon (Acipenser naccarii)',
      image: require('@/assets/images/adriatic_sturgeon.png'),
      details:
        'The Adriatic Sturgeon is critically endangered, known for its large size and distinctive scales. Overfishing, pollution, and habitat loss have drastically reduced its numbers.',
    },
    {
      name: 'European Eel (Anguilla anguilla)',
      image: require('@/assets/images/european_eel.png'),
      details:
        'The European Eel is critically endangered, with its population declining due to overfishing, habitat destruction, and a mysterious loss of juveniles. It migrates to the Sargasso Sea to breed.',
    },
    {
      name: 'Dusky Grouper (Epinephelus marginatus)',
      image: require('@/assets/images/dusky_grouper.png'),
      details:
        'The Dusky Grouper is an endangered species found in the Adriatic and Mediterranean. Slow to reproduce, it is highly vulnerable to overfishing, with conservation efforts focused on marine protected areas.',
    },
  ];

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to access the camera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleScan = async () => {
    if (cameraRef.current) {
      await cameraRef.current.pausePreview(); // Pause the camera preview
    }
    setIsScanning(true); // Start scanning, hide buttons, show AR image
    const randomIndex = Math.floor(Math.random() * fishData.length); // Randomize fish
    setRandomFish(fishData[randomIndex]); // Set random fish
  };

  const handleResumePreview = async () => {
    if (cameraRef.current) {
      await cameraRef.current.resumePreview(); // Resume the camera preview
    }
    setIsScanning(false); // Stop scanning, show buttons again
    setRandomFish(null); // Clear selected fish
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Camera overlay: Borders */}
        <View style={[styles.corner, styles.topLeft]} />
        <View style={[styles.corner, styles.topRight]} />
        <View style={[styles.corner, styles.bottomLeft]} />
        <View style={[styles.corner, styles.bottomRight]} />

        {/* Conditionally render crosshair lines based on scanning state */}
        {!isScanning && (
          <View style={styles.crossContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.verticalLine} />
          </View>
        )}

        {/* Buttons */}
        {!isScanning && (
          <>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setFacing(facing === 'back' ? 'front' : 'back')}
              >
                <Text style={styles.text}>Flip Camera</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.scanButtonContainer}>
              <TouchableOpacity style={styles.scanButton} onPress={handleScan}>
                <Text style={styles.scanButtonText}>Scan</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Display seahorse or random fish with text bubble */}
        {isScanning && randomFish && (
          <View style={styles.fishContainer}>
            <Image
              source={randomFish.image} // Show random fish image
              style={styles.fishImage}
            />
            <View style={styles.textBubble}>
              <Text style={styles.fishName}>{randomFish.name}</Text>
              <Text style={styles.fishDetails}>{randomFish.details}</Text>
            </View>
            <TouchableOpacity style={styles.resumeButton} onPress={handleResumePreview}>
              <Text style={styles.resumeButtonText}>Scan again</Text>
            </TouchableOpacity>
          </View>
        )}
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: 'white',
    borderWidth: 3,
  },
  topLeft: {
    top: 250,
    left: 50,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderBottomWidth: 0,
    borderRightWidth: 0,
  },
  topRight: {
    top: 250,
    right: 50,
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  bottomLeft: {
    bottom: 250,
    left: 50,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderTopWidth: 0,
    borderRightWidth: 0,
  },
  bottomRight: {
    bottom: 250,
    right: 50,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
  },
  crossContainer: {
    position: 'absolute',
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalLine: {
    position: 'absolute',
    width: 100,
    height: 2,
    top: 450,
    left: 150,
    backgroundColor: 'white',
  },
  verticalLine: {
    position: 'absolute',
    width: 2,
    height: 100,
    top: 400,
    left: 200,
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    right: 5,
    borderRadius: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  scanButtonContainer: {
    position: 'absolute',
    bottom: 170,
    left: 165,
    alignItems: 'center',
  },
  scanButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  fishContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '30%',
    left: '20%',
  },
  fishImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  textBubble: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: 250,
    alignItems: 'center',
  },
  fishName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  fishDetails: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
  },
  resumeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    right: 120,
    top: 10,
    padding: 10,
    borderRadius: 8,
  },
  resumeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});
