import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const AddAddressScreen = ({ navigation }) => {
  const [address, setAddress] = useState("");

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8F3" }}>
      {/* Header Section */}
      <View style={{ paddingTop: 48, paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {/* Back Arrow */}
          <TouchableOpacity
            style={{
              padding: 8,
              borderRadius: 25,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={24} color="#ff8200" />
          </TouchableOpacity>

          <View>
            <Text style={{ fontSize: 30, fontWeight: "bold", color: "#545454", letterSpacing: 0.5 }}>
              Add Address
            </Text>
            <Text style={{ fontSize: 18, color: "#ff8200" }}>Enter your address details</Text>
          </View>

          {/* Notification Icon */}
          <TouchableOpacity
            style={{
              padding: 8,
              borderRadius: 25,
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Icon name="notifications" size={24} color="#ff8200" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Address Input Section */}
      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "#545454", marginBottom: 16 }}>Address Details</Text>

        <TextInput
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 12,
            marginBottom: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
          placeholder="Enter your address"
          value={address}
          onChangeText={setAddress}
        />

        <TouchableOpacity
          onPress={() => {
            // Save address logic, possibly update global state or backend
            navigation.goBack();
          }}
          style={{
            backgroundColor: "white",
            borderLeftWidth: 4,
            borderLeftColor: "#ff8200",
            borderRadius: 12,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
            marginBottom: 16,
          }}
        >
          <View style={{ padding: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#545454" }}>Save Address</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddAddressScreen;
