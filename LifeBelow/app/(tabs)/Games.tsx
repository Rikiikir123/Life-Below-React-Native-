import { View, Text, StyleSheet } from 'react-native';

export default function GamesScreen() {
  return (
    <View style={styles.container}>
      <Text>Explore the app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#77A0F2',
  },
});