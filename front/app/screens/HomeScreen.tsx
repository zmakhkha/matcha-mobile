import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const users = [
    { id: '1', name: 'John Doe', photo: 'https://via.placeholder.com/100' },
    // More user objects
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen', { userId: item.id })}>
      <Image source={{ uri: item.photo }} style={styles.photo} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  return <FlatList data={users} renderItem={renderItem} keyExtractor={(item) => item.id} />;
};

const styles = StyleSheet.create({
  photo: { width: 100, height: 100, borderRadius: 50 },
  name: { textAlign: 'center', marginTop: 10 },
});

export default HomeScreen;
