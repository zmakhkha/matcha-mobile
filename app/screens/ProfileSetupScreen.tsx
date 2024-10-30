// app/screens/ProfileSetupScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Colors from '../constants/Colors';

export default function ProfileSetupScreen() {
  const [gender, setGender] = useState('');
  const [sexualPreferences, setSexualPreferences] = useState('');
  const [biography, setBiography] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [newInterest, setNewInterest] = useState('');
  const [profilePictures, setProfilePictures] = useState<string[]>([]);
  const [fameRating, setFameRating] = useState(0);
  const [locationEnabled, setLocationEnabled] = useState(true);

  const addInterest = () => {
    if (newInterest && interests.length < 10) {
      setInterests([...interests, `#${newInterest.trim()}`]);
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(item => item !== interest));
  };

  const handleUploadPicture = () => {
    // Logic to handle picture upload
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <Text style={styles.sectionTitle}>Personal Information</Text>
      <TextInput
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />
      <TextInput
        placeholder="Sexual Preferences"
        value={sexualPreferences}
        onChangeText={setSexualPreferences}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />
      <TextInput
        placeholder="Biography"
        value={biography}
        onChangeText={setBiography}
        style={[styles.input, styles.multilineInput]}
        placeholderTextColor={Colors.textPlaceholder}
        multiline
      />

      <Text style={styles.sectionTitle}>Interests</Text>
      <View style={styles.interestsContainer}>
        <TextInput
          placeholder="Add Interest"
          value={newInterest}
          onChangeText={setNewInterest}
          style={styles.input}
          placeholderTextColor={Colors.textPlaceholder}
        />
        <Button title="Add" onPress={addInterest} color={Colors.primary} />
      </View>
      <View style={styles.tagsContainer}>
        {interests.map(interest => (
          <TouchableOpacity key={interest} onPress={() => removeInterest(interest)} style={styles.tag}>
            <Text style={styles.tagText}>{interest}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Profile Pictures</Text>
      <View style={styles.picturesContainer}>
        {profilePictures.map((pic, index) => (
          <Image key={index} source={{ uri: pic }} style={styles.profilePicture} />
        ))}
        {profilePictures.length < 5 && (
          <TouchableOpacity onPress={handleUploadPicture} style={styles.addPictureButton}>
            <Text style={styles.addPictureText}>+ Add Picture</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Fame Rating: {fameRating}</Text>
      <TextInput
        placeholder="Adjust Fame Rating"
        keyboardType="numeric"
        value={String(fameRating)}
        onChangeText={(value) => setFameRating(Number(value))}
        style={styles.input}
        placeholderTextColor={Colors.textPlaceholder}
      />

      <View style={styles.locationContainer}>
        <Text style={styles.sectionTitle}>Location Settings</Text>
        <View style={styles.locationToggleContainer}>
          <Text style={styles.locationText}>GPS Positioning</Text>
          <Button
            title={locationEnabled ? "Enabled" : "Disabled"}
            color={locationEnabled ? Colors.success : Colors.error}
            onPress={() => setLocationEnabled(!locationEnabled)}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.editLocation}>Edit Location</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.primary,
    marginVertical: 10,
  },
  input: {
    backgroundColor: Colors.surface,
    borderColor: Colors.primaryLight,
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    color: Colors.textPrimary,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  interestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
  },
  tag: {
    backgroundColor: Colors.primaryLight,
    padding: 8,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: Colors.surface,
    fontWeight: '500',
  },
  picturesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  profilePicture: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 8,
  },
  addPictureButton: {
    width: 80,
    height: 80,
    backgroundColor: Colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 8,
  },
  addPictureText: {
    color: Colors.surface,
    fontWeight: 'bold',
  },
  locationContainer: {
    marginTop: 20,
  },
  locationToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  locationText: {
    color: Colors.textPrimary,
    fontSize: 16,
  },
  editLocation: {
    color: Colors.accent,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
