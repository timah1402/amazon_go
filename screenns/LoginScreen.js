import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { auth } from "../firebase"; // Make sure this is the correct path to your Firebase configuration
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Check if fields are empty
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    // Use Firebase to sign in
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        Alert.alert("Success", "Logged in successfully!");
        navigation.navigate("Home"); // Navigate to Home screen on success
      })
      .catch((error) => {
        // Handle Errors
        const errorCode = error.code;
        const errorMessage = error.message;

        // Display appropriate error message
        if (errorCode === "auth/user-not-found") {
          Alert.alert("Error", "No user found with this email.");
        } else if (errorCode === "auth/wrong-password") {
          Alert.alert("Error", "Incorrect password.");
        } else {
          Alert.alert("Error", errorMessage);
        }
      });
  };

  return (
    <View style={[tw`h-full w-full`, { backgroundColor: "#FFF5EB" }]}>
      {/* Logo Section */}
      <View style={tw`mt-12 items-center`}>
        <Image
          source={require("../assets/logo.png")}
          style={[tw`w-56 h-56 mb-4`]}
          resizeMode="contain"
        />
        <Text style={[tw`text-3xl font-bold`, { color: "#545454" }]}>
          Welcome Back
        </Text>
      </View>

      {/* Form Section */}
      <View style={tw`mt-10 px-6`}>
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
            tw`w-full bg-white p-4 rounded-xl mb-6`,
            { borderColor: "#FFE5CC", borderWidth: 1, color: "#545454" },
          ]}
          placeholder="Password"
          placeholderTextColor="#AAA"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          style={[
            tw`w-full p-4 rounded-xl mb-4`,
            { backgroundColor: "#ff8200" },
          ]}
          onPress={handleLogin} // Call handleLogin on press
        >
          <Text style={tw`text-white text-center font-bold text-lg`}>
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[tw`text-center font-medium`, { color: "#ff8200" }]}>
            Create an account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
