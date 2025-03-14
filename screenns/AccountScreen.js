import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import BottomNavBar from "../components/BootomNavbar";
import AddressBookScreen from "./AddressBookScreen";

const AccountScreen = ({ navigation }) => {
  return (
    <View style={[tw`h-full w-full`, { backgroundColor: "#FFF8F3" }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-24`}>
        {/* Header Section */}
        <LinearGradient colors={["#FFF8F3", "#FFF8F3"]} style={tw`pt-12 px-6 pb-6`}>
          <Text style={[tw`text-3xl font-bold`, { color: "#545454", letterSpacing: 1 }]}>
            Your Account
          </Text>
          <Text style={[tw`text-lg`, { color: "#ff8200" }]}>Manage your profile and settings</Text>
        </LinearGradient>

        {/* Profile Card */}
        <View style={tw`px-6`}>
          <TouchableOpacity
            style={[
              tw`bg-white rounded-2xl p-5`,
              { borderLeftWidth: 4, borderLeftColor: "#ff8200", elevation: 3 },
            ]}
          >
            <View style={tw`flex-row items-center`}>
              <Image
                source={{ uri: "https://via.placeholder.com/80" }}
                style={tw`w-20 h-20 rounded-full`}
              />
              <View style={tw`ml-4`}>
                <Text style={[tw`font-bold text-lg`, { color: "#545454" }]}>fatima</Text>
                <Text style={{ color: "#666666" }}>fatim@gmail.com</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={tw`mt-8 px-6`}>
          <Text style={[tw`text-xl font-bold mb-4`, { color: "#545454" }]}>Account Settings</Text>

          {/* Navigation Buttons */}
          {[
            { title: "Change Password", icon: "lock", screen: "ChangePassword" },
            { title: "Payment Methods", icon: "payment", screen: "PaymentMethods" },
           
            { title: "Address Book", icon: "location-on", screen: "AddressBook" }, 
            { 
              title: "Notifications", 
              icon: "notifications", 
              screen: "NotificationScreen" // Added Navigation for Notifications
            },
          ].map((item) => (
            <TouchableOpacity
              key={item.title}
              onPress={() => item.screen && navigation.navigate(item.screen)} // Navigate to corresponding screen
              style={[
                tw`bg-white rounded-2xl p-5 mb-4`,
                { borderLeftWidth: 4, borderLeftColor: "#ff8200", elevation: 3 },
              ]}
            >
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View style={[tw`p-3 rounded-xl mr-4`, { backgroundColor: "#FFF5EB" }]}>
                    <MaterialIcons name={item.icon} size={24} color="#ff8200" />
                  </View>
                  <Text style={[tw`font-bold text-lg`, { color: "#545454" }]}>{item.title}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ff8200" />
              </View>
            </TouchableOpacity>
          ))}

          {/* Logout Button */}
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={[tw`rounded-2xl mb-4`, { elevation: 8 }]}
          >
            <LinearGradient colors={["#ff8200", "#ff9933"]} style={tw`p-5 rounded-2xl`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`font-bold text-lg text-white`}>Logout</Text>
                <MaterialIcons name="exit-to-app" size={24} color="white" />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavBar activeScreen="Account" />
    </View>
  );
};

export default AccountScreen;
