import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Image } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { auth, db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

const ScanScreen = ({ navigation }) => {
  const [qrValue, setQrValue] = useState("loading...");
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUserQRValue();
  }, []);
  
  const fetchUserQRValue = async () => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.log("No authenticated user found");
        navigation.navigate("Login");
        return;
      }
      
      const userEmail = user.email?.toLowerCase();
      const usersCollection = collection(db, "users");
      const q = query(usersCollection, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        if (userData.qrValue) {
          setQrValue(userData.qrValue);
        } else {
          // Use user ID as fallback if no specific QR value exists
          setQrValue(`${user.uid}_${Date.now()}`);
        }
      } else {
        // Fallback QR value
        setQrValue(`${user.uid}_${Date.now()}`);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching QR value:", error);
      // Fallback in case of error
      setQrValue(`user_${Date.now()}`);
      setLoading(false);
    }
  };
  
  const handleQRCodeScan = () => {
    // Navigate to StoreEntryScreen after simulating QR scan
    navigation.navigate("StoreEntryScreen");
  };

  return (
    <SafeAreaView style={[tw`h-full w-full`, { backgroundColor: "#1a1a1a" }]}>
      {/* Header with back button */}
      <LinearGradient
        colors={["#1a1a1a", "#1a1a1a"]}
        style={tw`flex-row items-center pt-12 px-6 pb-4`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={[tw`p-2 -ml-2 rounded-full`, { backgroundColor: "#333333" }]}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ff8200" />
        </TouchableOpacity>
        <Text style={[tw`text-lg font-bold ml-3`, { color: "#ff8200" }]}>Your Entry QR Code</Text>
      </LinearGradient>

      {/* Main content */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* QR Code Frame */}
        <View
          style={[
            tw`w-64 h-64 rounded-2xl mb-8 p-4 items-center justify-center`,
            {
              backgroundColor: "#ffffff",
              borderWidth: 2,
              borderColor: "#ff8200",
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 5,
            },
          ]}
        >
          {loading ? (
            <MaterialIcons name="hourglass-top" size={40} color="#ff8200" />
          ) : (
            <TouchableOpacity onPress={handleQRCodeScan} style={tw`items-center`}>
              <QRCode
                value={qrValue}
                size={200}
                color="#1a1a1a"
                backgroundColor="#ffffff"
              />
              <Text style={[tw`mt-2 text-xs`, { color: "#1a1a1a" }]}>Tap to simulate scan</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Instructions */}
        <View
          style={[
            tw`rounded-2xl p-6 w-full`,
            {
              backgroundColor: "#262626",
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 8,
              elevation: 5,
            },
          ]}
        >
          <Text style={[tw`text-lg font-bold mb-4`, { color: "#ff8200" }]}>
            How to Use
          </Text>

          {[
            { icon: "qr-code", text: "Show this QR code at store entrance" },
            { icon: "center-focus-strong", text: "Let the scanner read your code" },
            { icon: "door-front", text: "Door will open automatically" },
          ].map((item, index) => (
            <View
              key={index}
              style={[tw`flex-row items-center`, index !== 2 && tw`mb-4`]}
            >
              <View style={[tw`p-2 rounded-xl`, { backgroundColor: "#333333" }]}>
                <MaterialIcons name={item.icon} size={24} color="#ff8200" />
              </View>
              <Text style={[tw`ml-3`, { color: "#ffffff" }]}>{item.text}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Bottom Message */}
      <View style={tw`pb-8 px-6`}>
        <Text style={[tw`text-center`, { color: "#666666" }]}>
          Make sure Bluetooth and Location are enabled
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;