import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { StackNavigationProp } from '@react-navigation/stack';  // Import StackNavigationProp
import UserCard from '../components/UserCard'; 
import NavBar from '../components/NavBar';
import usersData from '../data/users.json'; 

import { RootStackParamList } from '../navigation/types';  // Import the types for navigation

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
  platforms: Platform[];
  image: string;
  visits: number;
  followers: number;
  interests: string[];
  about: string;
}

// Type the navigation prop
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigation = useNavigation<HomeScreenNavigationProp>();  // Use typed navigation

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(usersData); 
      } catch (error) {
        console.error('Error loading users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Handle user press to navigate to ProfileScreen
  const handleUserPress = (user: User) => {
    navigation.navigate('ProfileScreen', { user });
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
