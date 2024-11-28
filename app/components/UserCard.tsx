import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FaTiktok } from 'react-icons/fa';
interface User {
  id: number;
  name: string;
  gender: string;
  age: number;
  location: string;
  platforms: string[];
  image: string;
}

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.column}>
          <Text>{`${user.name} • ${user.gender} • ${user.age}`}</Text>
        </View>
        <View style={styles.iconRow}>
          {user.platforms.includes('snap') && (
            <MaterialCommunityIcons name="snapchat" size={24} color="#FFFC00" />
          )}
          {user.platforms.includes('tiktok') && (
            <MaterialCommunityIcons name="tiktok" size={24} color="black" />
			// <FaTiktok size={24} color="black" />
          )}
          {user.platforms.includes('insta') && (
            <MaterialCommunityIcons name="instagram" size={24} color="purple" />
          )}
        </View>
        <View style={styles.column}>
          <Text>{user.location}</Text>
        </View>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  details: {
    flex: 1,
  },
  column: {
    marginBottom: 5,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // For spacing between icons (React Native 0.71+)
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
});

export default UserCard;
