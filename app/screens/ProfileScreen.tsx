import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

interface Platform {
  [key: string]: string; // Dynamic keys for platforms
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
  interests: string[];
  about: string;
}

interface ProfileScreenProps {
  route: {
    params: {
      user: User; // Expecting the user object to be passed
    };
  };
}
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route }) => {
  const { user } = route.params; // Extract user from route params

  // Log interests outside of JSX
  console.log(user.interests);

  const handlePlatformClick = (platform: string, username: string) => {
    const urls: { [key: string]: string } = {
      snap: `https://www.snapchat.com/add/${username}`,
      tiktok: `https://www.tiktok.com/@${username}`,
      insta: `https://www.instagram.com/${username}`,
    };

    if (urls[platform]) {
      Linking.openURL(urls[platform]);
    } else {
      alert('This platform is not supported yet.');
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'snap':
        return (
          <MaterialCommunityIcons name="snapchat" size={30} color="#FFFC00" />
        );
      case 'tiktok':
        return (
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/TikTok_logo.svg',
            }}
            style={styles.tiktokIcon}
          />
        );
      case 'insta':
        return (
          <MaterialCommunityIcons name="instagram" size={30} color="#E1306C" />
        );
      default:
        return <FontAwesome5 name="question-circle" size={30} color="#888" />;
    }
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
        <Text style={styles.statText}>{`Visits: ${user.visits || 0}`}</Text>
        <Text style={styles.statText}>{`Followers: ${user.followers || 0}`}</Text>
      </View>

      {/* Social Media Platforms */}
      <Text style={styles.sectionTitle}>Social Media</Text>
      <View style={styles.platformIcons}>
        {Object.entries(user.platforms).map(([platform, username]) => (
          <TouchableOpacity
            key={platform}
            onPress={() => handlePlatformClick(platform, username)}
          >
            {getPlatformIcon(platform)}
          </TouchableOpacity>
        ))}
      </View>

      {/* Interests */}
      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interests}>
        {user.interests?.length > 0 ? (
          user.interests.map((interest, index) => (
            <View key={index} style={styles.interestBubble}>
              <Text style={styles.interestText}>{interest}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noInterests}>No interests added.</Text>
        )}
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
  noInterests: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginVertical: 16,
  },
});

export default ProfileScreen;
