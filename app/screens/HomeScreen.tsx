import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import UserCard from '../components/UserCard'; // Ensure this component is updated
import NavBar from '../components/NavBar';
import usersData from '../data/users.json'; // Simulate imported JSON

interface Platform {
  snap?: string;
  tiktok?: string;
  insta?: string;
}

interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  location: string;
  platforms: Platform[]; // Updated to be an array of platform objects
  image: string;
  visits: number;
  followers: number;
  interests: string[];
  about: string;
}

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(usersData); // Use the imported JSON directly
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Define what happens when a user card is clicked
  const handleUserPress = (user: User) => {
    // Example: Show an alert with user name and age
    Alert.alert('User Clicked', `Name: ${user.name}, Age: ${user.age}`);
    // Alternatively, navigate to another screen or show more details here
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard user={item} onPress={() => handleUserPress(item)} />
        )}
        contentContainerStyle={styles.list}
      />
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    paddingBottom: 60,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
