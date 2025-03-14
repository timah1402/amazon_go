import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import * as ImagePicker from "expo-image-picker";
import { auth, db, storage } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import * as ImageManipulator from 'expo-image-manipulator';

const AdditionalInfoScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selfie, setSelfie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    checkUserInfo();
  }, []);

  const checkUserInfo = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Session Expired", "Please login again to continue");
      navigation.navigate("Login");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.phoneNumber) setPhoneNumber(userData.phoneNumber);
        if (userData.selfie) setSelfie(userData.selfie);
        if (userData.phoneNumber && userData.selfie) {
          navigation.navigate("NextPage");
        }
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user info:", error);
      Alert.alert("Error", "Failed to load your information");
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant camera roll permissions");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelfie(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to select image");
    }
  };

  const handleSaveInfo = async () => {
    if (!phoneNumber || !selfie) {
      Alert.alert("Error", "Please provide both phone number and selfie");
      return;
    }
  
    setIsSaving(true);
  
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Authentication Error", "Please login again");
        navigation.navigate("Login");
        return;
      }
  
      let selfieURL = selfie;
      if (!selfie.startsWith("http")) {
        try {
          // First compress the image
          const manipulateResult = await ImageManipulator.manipulateAsync(
            selfie,
            [{ resize: { width: 800 } }], // Resize to reasonable dimensions
            { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
          );
  
          console.log("Image compressed:", manipulateResult.uri);
  
          // Convert to blob
          const response = await fetch(manipulateResult.uri);
          const blob = await response.blob();
          console.log("Blob size:", blob.size);
  
          // Create unique filename
          const filename = `selfies/${user.uid}_${Date.now()}.jpg`;
          const storageRef = ref(storage, filename);
  
          // Upload with metadata
          const metadata = {
            contentType: 'image/jpeg',
          };
  
          // Upload blob
          console.log("Starting upload...");
          await uploadBytesResumable(storageRef, blob, metadata);
  
          // Get URL
          selfieURL = await getDownloadURL(storageRef);
          console.log("Upload successful, URL:", selfieURL);
  
        } catch (imageError) {
          console.error("Detailed image error:", imageError);
          throw new Error(`Image upload failed: ${imageError.message}`);
        }
      }
  
      // Save to Firestore
      const userDocRef = doc(db, "users", user.uid);
      await setDoc(userDocRef, {
        phoneNumber,
        selfie: selfieURL,
        updatedAt: new Date().toISOString()
      }, { merge: true });
  
      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("NextPage");
  
    } catch (error) {
      console.error("Save error:", error);
      Alert.alert("Error", error.message || "Failed to save information");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={[tw`flex-1 justify-center items-center`, { backgroundColor: '#FFF8F3' }]}>
        <ActivityIndicator size="large" color="#ff8200" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[tw`h-full w-full`, { backgroundColor: '#FFF8F3' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        bounces={true}
        overScrollMode="always"
      >
        {/* Header */}
        <LinearGradient
          colors={['#FFF8F3', '#FFF8F3']}
          style={tw`pt-12 px-6`}
        >
          <Text style={[tw`text-2xl font-bold`, { color: '#545454' }]}>
            Complete Your Profile
          </Text>
          <Text style={[tw`text-lg mt-2`, { color: '#666666' }]}>
            Please provide your phone number and a selfie to continue.
          </Text>
        </LinearGradient>

        {/* Form */}
        <View style={tw`mt-6 mx-6`}>
          {/* Phone Input */}
          <View style={[
            tw`rounded-2xl mb-6`,
            {
              backgroundColor: '#FFF5EB',
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }
          ]}>
            <TextInput
              style={[tw`px-4 py-3`, { color: '#545454' }]}
              placeholder="Phone Number"
              placeholderTextColor="#666666"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              editable={!isSaving}
            />
          </View>

          {/* Selfie Section */}
          <TouchableOpacity onPress={pickImage} disabled={isSaving}>
            <View style={[
              tw`rounded-2xl items-center justify-center`,
              {
                backgroundColor: '#FFF5EB',
                height: 200,
                shadowColor: "#ff8200",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }
            ]}>
              {selfie ? (
                <Image
                  source={{ uri: selfie }}
                  style={[tw`rounded-2xl`, { width: '100%', height: '100%' }]}
                />
              ) : (
                <View style={tw`items-center`}>
                  <MaterialIcons name="add-a-photo" size={40} color="#ff8200" />
                  <Text style={[tw`mt-2`, { color: '#666666' }]}>Add Selfie</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>

          {/* Save Button */}
          <TouchableOpacity
            style={[
              tw`mt-6 px-6 py-3 rounded-2xl`,
              {
                backgroundColor: '#ff8200',
                shadowColor: "#ff8200",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
                opacity: (!phoneNumber || !selfie || isSaving) ? 0.5 : 1,
              }
            ]}
            onPress={handleSaveInfo}
            disabled={!phoneNumber || !selfie || isSaving}
          >
            <Text style={tw`text-white font-semibold text-lg text-center`}>
              {isSaving ? "Saving..." : "Save Information"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdditionalInfoScreen;