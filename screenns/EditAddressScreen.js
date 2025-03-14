import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const EditAddressScreen = ({ navigation, route }) => {
  const { address } = route.params; // Receive the address type (Home, Work, etc.)

  // State for the address form fields
  const [newAddress, setNewAddress] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Dummy logic for loading the current address details (You'd replace this with actual data fetching)
  useEffect(() => {
    if (address === "Home") {
      setNewAddress("saly");
      setIsDefault(true);
    } else if (address === "Work") {
      setNewAddress("somone");
      setIsDefault(false);
    }
  }, [address]);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8F3" }}>
      <View style={{ paddingTop: 48, paddingHorizontal: 24, paddingBottom: 24 }}>
        <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#545454', letterSpacing: 1 }}>
          Edit {address} Address
        </Text>
        <Text style={{ fontSize: 18, color: "#ff8200" }}>Update the details of your address</Text>
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#545454', marginBottom: 16 }}>Address Details</Text>

        <TextInput
          style={{ backgroundColor: 'white', padding: 16, borderRadius: 12, marginBottom: 16, elevation: 3 }}
          placeholder="Enter your updated address"
          value={newAddress}
          onChangeText={setNewAddress}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 18, color: '#545454' }}>Set as Default Address</Text>
          <Switch
            value={isDefault}
            onValueChange={(value) => setIsDefault(value)}
            trackColor={{ false: "#ccc", true: "#ff8200" }}
            thumbColor={isDefault ? "#fff" : "#f4f3f4"}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            // Save the edited address (e.g., update global state or make an API call)
            navigation.goBack(); // Go back after saving
          }}
          style={{ backgroundColor: "white", borderRadius: 12, padding: 16, marginBottom: 16, borderLeftWidth: 4, borderLeftColor: "#ff8200", elevation: 3 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>Save Address</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            // Add logic to delete the address if needed
            navigation.goBack();
          }}
          style={{ backgroundColor: "#ff4d4d", borderRadius: 12, padding: 16, marginBottom: 16, elevation: 3 }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', marginRight: 8 }}>Delete Address</Text>
            <Icon name="delete" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditAddressScreen;
