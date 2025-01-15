import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

export default function SeaLifeScannerScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(false);
  const [showResult, setShowResult] = useState(false);

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

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowResult(true);
    }, 3000); // Simulate a 3-second scan
  };

  const handleBack = () => {
    setShowResult(false);
  };

  return (
    <View style={styles.container}>
      {!showResult ? (
        isScanning ? (
          <View style={styles.scanningContainer}>
            <Text style={styles.scanningText}>Scanning coastal waters...</Text>
          </View>
        ) : (
          <CameraView style={styles.camera} facing={facing}>
            {/* Camera overlay: Borders and Cross */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />
            <View style={styles.crossContainer}>
              <View style={styles.horizontalLine} />
              <View style={styles.verticalLine} />
            </View>

            {/* Buttons */}
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
          </CameraView>
        )
      ) : (
        <View style={styles.resultContainer}>
          {/* Show fish result */}
          <Image
            source={require('@/assets/images/seahorse.jpg')} // Replace with your fish image
            style={styles.fishImage}
          />
          <Text style={styles.fishName}>Seahorse (Hippocampus guttulatus)</Text>
          <Text style={styles.fishDetails}>
            Seahorses are small marine fishes known for their unique appearance and swimming style. They inhabit shallow coastal waters and seagrass beds. This species is vulnerable due to habitat loss and pollution.
          </Text>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
        </View>
      )}
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
  scanningContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  scanningText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5FAAD9',
  },
  fishImage: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  fishName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  fishDetails: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 20,
    lineHeight: 22,
    textAlign: 'justify',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#2477BF',
    borderRadius: 8,
  },
  backButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
    fontSize: 16,
  },
  
});
