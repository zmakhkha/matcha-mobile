import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
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
  platforms: Platform;
  image: string;
  visits: number;
  followers: number;
  Interests: string[];
  about: string;
}

interface ProfileScreenProps {
  user: User;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const handlePlatformClick = (platform: string, username: string) => {
    console.log(`Clicked on ${platform}: ${username}`);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Image */}
      <Image source={{ uri: user.image }} style={styles.profileImage} />

      {/* Name */}
      <Text style={styles.name}>{user.name}</Text>

      {/* Age, Gender, and Location */}
      <Text style={styles.details}>
        {`${user.age} • ${user.gender} • ${user.location}`}
      </Text>

      {/* Stats */}
      <View style={styles.stats}>
        <Text style={styles.statText}>{`Visits: ${user.visits}`}</Text>
        <Text style={styles.statText}>{`Followers: ${user.followers}`}</Text>
      </View>

      {/* Social Media Platforms */}
      <View style={styles.platformIcons}>
        {user.platforms.snap && (
          <TouchableOpacity
            onPress={() => handlePlatformClick('Snapchat', user.platforms.snap)}
          >
            <MaterialCommunityIcons name="snapchat" size={30} color="#FFFC00" />
          </TouchableOpacity>
        )}
        {user.platforms.tiktok && (
          <TouchableOpacity
            onPress={() => handlePlatformClick('TikTok', user.platforms.tiktok)}
          >
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/TikTok_logo.svg',
              }}
              style={styles.tiktokIcon}
            />
          </TouchableOpacity>
        )}
        {user.platforms.insta && (
          <TouchableOpacity
            onPress={() => handlePlatformClick('Instagram', user.platforms.insta)}
          >
            <MaterialCommunityIcons
              name="instagram"
              size={30}
              color="#E1306C"
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Interests */}
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interests}>
        {user.Interests.map((interest, index) => (
          <View key={index} style={styles.interestBubble}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
      </View>

      {/* About Me */}
      <Text style={styles.sectionTitle}>About Me</Text>
      <Text style={styles.aboutText}>{user.about}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9', // Subtle light gray background
    padding: 16,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginVertical: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333', // Neutral dark gray for text
  },
  details: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555', // Softer gray
    marginVertical: 4,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginVertical: 16,
  },
  statText: {
    fontSize: 16,
    color: '#444',
  },
  platformIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginVertical: 16,
  },
  tiktokIcon: {
    width: 30,
    height: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#222',
    marginVertical: 12,
    textAlign: 'center',
  },
  interests: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  interestBubble: {
    backgroundColor: '#EDEFF1', // Soft gray-blue bubble
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  interestText: {
    fontSize: 14,
    color: '#444',
  },
  aboutText: {
    fontSize: 16,
    lineHeight: 22,
    color: '#555',
    textAlign: 'center',
    marginVertical: 12,
  },
});

export default ProfileScreen;
