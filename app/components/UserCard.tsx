import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
  platforms: Platform[]; // Ensure it's an array of platform objects
  image: string;
  visits: number;
  followers: number;
  interests: string[];
  about: string;
}

interface UserCardProps {
  user: User;
  onPress: () => void;  // Add onPress prop
}

const UserCard: React.FC<UserCardProps> = ({ user, onPress }) => {
  // Extract platform information
  const snapAvailable = user.platforms.some((platform) => platform.snap);
  const tiktokAvailable = user.platforms.some((platform) => platform.tiktok);
  const instaAvailable = user.platforms.some((platform) => platform.insta);

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image source={{ uri: user.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{`${user.name}, ${user.age}`}</Text>
        <Text style={styles.info}>{`${user.gender} • ${user.location}`}</Text>

        {/* Social Media Icons */}
        <View style={styles.iconRow}>
          {snapAvailable && (
            <MaterialCommunityIcons
              name="snapchat"
              size={24}
              color="#FFFC00"
              accessibilityLabel="Snapchat"
            />
          )}
          {tiktokAvailable && (
            <MaterialCommunityIcons
              name="tiktok"
              size={24}
              color="#000000"
              accessibilityLabel="TikTok"
            />
          )}
          {instaAvailable && (
            <MaterialCommunityIcons
              name="instagram"
              size={24}
              color="#E1306C"
              accessibilityLabel="Instagram"
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    backgroundColor: '#FFF',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 12,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
});

export default UserCard;
