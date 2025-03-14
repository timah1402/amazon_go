import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddressBookScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8F3" }}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 24 }}>
        {/* Header Section */}
        <View style={{ paddingTop: 48, paddingHorizontal: 24, paddingBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Back Arrow Button */}
            <TouchableOpacity
              style={{
                padding: 8,
                borderRadius: 25,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 3,
              }}
              onPress={() => navigation.goBack()}
            >
              <Icon name="arrow-back" size={24} color="#ff8200" />
            </TouchableOpacity>

            {/* Title and Subtitle */}
            <View>
              <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#545454', letterSpacing: 0.5 }}>
                Address Book
              </Text>
              <Text style={{ fontSize: 18, color: '#ff8200' }}>
                Manage Your Addresses
              </Text>
            </View>

            {/* Notification Icon */}
            <TouchableOpacity
              style={{
                padding: 8,
                borderRadius: 25,
                backgroundColor: 'white',
                shadowColor: '#000',
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

        {/* Address List Section */}
        <View style={{ paddingHorizontal: 24 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#545454', marginBottom: 16 }}>
            Your Saved Addresses
          </Text>

          {/* Example Address 1 (Default) */}
          <View style={{ marginBottom: 16, backgroundColor: 'white', borderLeftWidth: 4, borderLeftColor: '#ff8200', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>Home Address</Text>
                <Text style={{ color: '#666666', marginTop: 4 }}>somone</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("EditAddress", { address: "Home" })}>
                <Icon name="edit" size={24} color="#ff8200" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Example Address 2 */}
          <View style={{ marginBottom: 16, backgroundColor: 'white', borderLeftWidth: 4, borderLeftColor: '#ff8200', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 }}>
            <View style={{ padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>Work Address</Text>
                <Text style={{ color: '#666666', marginTop: 4 }}>saly</Text>
              </View>
              <TouchableOpacity onPress={() => navigation.navigate("EditAddress", { address: "Work" })}>
                <Icon name="edit" size={24} color="#ff8200" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Add New Address Button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddAddress")}
          style={{
            marginBottom: 16,
            backgroundColor: 'white',
            borderLeftWidth: 4,
            borderLeftColor: '#ff8200',
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>Add New Address</Text>
            <Icon name="add" size={24} color="#ff8200" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddressBookScreen;
