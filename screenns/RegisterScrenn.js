import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase"; // Adjust the path as needed
import { db } from "../firebase"; // Firestore reference
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    // Validate inputs
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User created: ", user);
      // Add user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        createdAt: new Date(),
      });

      Alert.alert("Success", "Account created successfully!");
      navigation.navigate("Home");
    } catch (error) {
      const errorMessage = error.message;
      Alert.alert("Error", errorMessage);
    }
  };

  return (
    <View style={[tw`h-full w-full`, { backgroundColor: "#FFF5EB" }]}>
      {/* Logo Section */}
      <View style={tw`mt-12 items-center`}>
        <Image
          source={require("../assets/logo.png")}
          style={[
            tw`w-56 h-56 mb-4`,
            {
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3,
              elevation: 3,
            },
          ]}
          resizeMode="contain"
        />
        <Text
          style={[
            tw`text-3xl font-bold`,
            {
              color: "#545454",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              letterSpacing: 1,
            },
          ]}
        >
          Sign up
        </Text>
      </View>

      {/* Form Section */}
      <View style={tw`mt-8 px-6`}>
        <TextInput
          style={[
            tw`w-full bg-white p-4 rounded-xl mb-4`,
            { borderColor: "#FFE5CC", borderWidth: 1, color: "#545454" },
          ]}
          placeholder="Full Name"
          placeholderTextColor="#AAA"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={[
            tw`w-full bg-white p-4 rounded-xl mb-4`,
            { borderColor: "#FFE5CC", borderWidth: 1, color: "#545454" },
          ]}
          placeholder="Email"
          placeholderTextColor="#AAA"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={[
            tw`w-full bg-white p-4 rounded-xl mb-4`,
            { borderColor: "#FFE5CC", borderWidth: 1, color: "#545454" },
          ]}
          placeholder="Password"
          placeholderTextColor="#AAA"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={[
            tw`w-full bg-white p-4 rounded-xl mb-6`,
            { borderColor: "#FFE5CC", borderWidth: 1, color: "#545454" },
          ]}
          placeholder="Confirm Password"
          placeholderTextColor="#AAA"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={handleRegister}
          style={[
            tw`w-full p-4 rounded-xl mb-4`,
            { backgroundColor: "#ff8200", shadowColor: "#ff8200", elevation: 5 },
          ]}
        >
          <Text
            style={[
              tw`text-white text-center font-bold text-lg`,
              { letterSpacing: 0.5 },
            ]}
          >
            Create Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text
            style={[
              tw`text-center font-medium`,
              { color: "#ff8200", shadowColor: "#ff8200" },
            ]}
          >
            Already have an account? Login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
