import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ScanScreen = ({ navigation }) => {
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
          onPress={() => navigation.navigate("Home")} // Go back to previous screen
          style={[tw`p-2 -ml-2 rounded-full`, { backgroundColor: "#333333" }]}
        >
          <MaterialIcons name="arrow-back" size={24} color="#ff8200" />
        </TouchableOpacity>
        <Text style={[tw`text-lg font-bold ml-3`, { color: "#ff8200" }]}>Scan to Enter</Text>
      </LinearGradient>

      {/* Remaining content stays the same */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
        {/* Scan Frame */}
        <View
        style={[
          tw`w-64 h-64 rounded-2xl mb-8`,
          {
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
        <View style={tw`flex-1 justify-center items-center`}>
          {/* Wrap the QR code icon with TouchableOpacity to trigger navigation */}
          <TouchableOpacity onPress={handleQRCodeScan}>
            <MaterialIcons name="qr-code-scanner" size={40} color="#ff8200" />
          </TouchableOpacity>
        </View>
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
            How to Scan
          </Text>

          {[
            { icon: "qr-code", text: "Find the QR code at store entrance" },
            { icon: "center-focus-strong", text: "Center the code in the frame" },
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
