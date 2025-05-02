import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import { auth, db, realtimeDb } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, onValue, off,set } from "firebase/database"; // Add Realtime Database imports

const ScanScreen = ({ navigation }) => {
  const [qrValue, setQrValue] = useState("loading...");
  const [loading, setLoading] = useState(true);
  const [scannedInput, setScannedInput] = useState("");
  const textInputRef = useRef(null);

  useEffect(() => {
    fetchUserQRValue();
  }, []);

  // Ensure TextInput is focused
  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  // Listen for Realtime Database updates
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userId = user.uid;
    const statusRef = ref(realtimeDb, `scanStatus/${userId}`);

    const handleStatusUpdate = (snapshot) => {
      const data = snapshot.val();
      if (data && data.status === "granted") {
        // Navigate to StoreEntryScreen when QR code is valid
        navigation.navigate("StoreEntryScreen");
        // Reset the status to prevent repeated navigation
        set(ref(realtimeDb, `scanStatus/${userId}`), null); 
        
      } else if (data && data.status === "denied") {
        Alert.alert("Access Denied", "Invalid QR code.");
      }
    };

    // Attach the listener
    onValue(statusRef, handleStatusUpdate);

    // Cleanup listener on unmount
    return () => {
      off(statusRef, "value", handleStatusUpdate);
    };
  }, [navigation]);

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
          setQrValue(`${user.uid}_${Date.now()}`);
        }
      } else {
        setQrValue(`${user.uid}_${Date.now()}`);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching QR value:", error);
      setQrValue(`user_${Date.now()}`);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[tw`h-full w-full`, { backgroundColor: "#1a1a1a" }]}>
      {/* Header */}
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
        <Text style={[tw`text-lg font-bold ml-3`, { color: "#ff8200" }]}>
          Your Entry QR Code
        </Text>
      </LinearGradient>

      {/* Main content */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
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
            <QRCode
              value={qrValue}
              size={200}
              color="#1a1a1a"
              backgroundColor="#ffffff"
            />
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
            {
              icon: "center-focus-strong",
              text: "Let the scanner read your code",
            },
            { icon: "door-front", text: "Door will open automatically" },
          ].map((item, index) => (
            <View
              key={index}
              style={[tw`flex-row items-center`, index !== 2 && tw`mb-4`]}
            >
              <View
                style={[tw`p-2 rounded-xl`, { backgroundColor: "#333333" }]}
              >
                <MaterialIcons name={item.icon} size={24} color="#ff8200" />
              </View>
              <Text style={[tw`ml-3`, { color: "#ffffff" }]}>
                {item.text}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Hidden TextInput to capture scanner input (if needed) */}
      <TextInput
        ref={textInputRef}
        style={{ position: "absolute", top: 0, left: 0, width: 1, height: 1, opacity: 0 }}
        autoFocus={true}
        value={scannedInput}
        onChangeText={(text) => {
          console.log("Scanned input (partial):", text);
          setScannedInput(text);
        }}
        onSubmitEditing={() => {
          const code = scannedInput.trim();
          console.log("Complete scanned code:", code);
          setScannedInput("");
        }}
        showSoftInputOnFocus={false}
      />

      {/* Bottom info */}
      <View style={tw`pb-8 px-6`}>
        <Text style={[tw`text-center`, { color: "#666666" }]}>
          Make sure Bluetooth and Location are enabled
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default ScanScreen;