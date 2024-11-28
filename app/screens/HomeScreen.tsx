import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import UserCard from '../components/UserCard';
import NavBar from '../components/NavBar';
import usersData from '../data/users.json'; // Import the JSON directly

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  location: string;
  platforms: string[];
  image: string;
}

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simulate an async fetch for testing
    const fetchUsers = async () => {
      try {
        // Replace this with actual API call when moving to production
        setUsers(usersData); // Directly use the imported data
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <UserCard user={item} />}
        contentContainerStyle={styles.list}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingBottom: 60, // Add space for the navbar
  },
});

export default HomeScreen;
