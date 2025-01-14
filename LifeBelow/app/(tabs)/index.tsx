import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const news = [
    { title: 'Volunteers clean Žusterna', content: 'A group of dedicated volunteers came together this weekend to clean up the beautiful beaches of Žusterna.' },
    { title: "Jellyfish swarm Slovenia's coastal area", content: 'Large swarms of jellyfish have been spotted near Slovenia’s coast, delighting some and worrying others.' },
    { title: 'A 114 kilogram fish has been caught in Koper', content: 'An incredible catch was made by a local fisherman in Koper, reeling in a 114 kg fish!' },
    { title: 'Storm causes damage along Piran waterfront', content: 'Strong winds and high waves battered the Piran waterfront last night, causing damage to boats and seaside structures.' },
    { title: 'Rare sea turtle spotted near Izola', content: 'A rare loggerhead sea turtle was seen swimming near Izola, exciting marine biologists and locals alike.' },
    { title: 'Dolphin pod sighted off Portorož', content: 'A playful pod of dolphins delighted onlookers near Portorož, jumping and swimming close to the shore.' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>News</Text>
      {news.map((item, index) => (
        <View key={index} style={styles.newsItem}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.content}>{item.content}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#77A0F2',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  newsItem: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007ACC',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#555',
  },
});
