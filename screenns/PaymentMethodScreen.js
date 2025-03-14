import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PaymentMethodScreen = ({ navigation }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const paymentMethods = [
    {
      id: 1,
      name: "Wave",
      logo: "https://via.placeholder.com/50/0000FF/FFFFFF?text=W",
      color: "#0077FF",
      icon: "waves"
    },
    {
      id: 2,
      name: "Orange Money",
      logo: "https://via.placeholder.com/50/FF7F00/FFFFFF?text=O",
      color: "#FF7F00",
      icon: "account-balance-wallet"
    },
  ];

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    Alert.alert("Payment Method Selected", `${method.name} has been selected.`);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8F3" }}>
      
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
              DIEULDEM
            </Text>
            <Text style={{ fontSize: 18, color: '#ff8200' }}>
              Payment Methods
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

      {/* Payment Methods List */}
      <View style={{ paddingHorizontal: 24 }}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => handleSelectMethod(method)}
            style={{
              marginBottom: 24,
              backgroundColor: 'white',
              borderLeftWidth: 4,
              borderLeftColor: selectedMethod?.id === method.id ? method.color : '#ff8200',
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <View style={{ padding: 20 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ 
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: '#FFF5EB',
                  marginRight: 16
                }}>
                  <Icon name={method.icon} size={24} color="#ff8200" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>
                    {method.name}
                  </Text>
                  <Text style={{ color: '#666666', marginTop: 4 }}>
                    {method.name === "Wave" ? "Secure payments with Wave" : "Pay with Orange Money"}
                  </Text>
                </View>
                {selectedMethod?.id === method.id && (
                  <Icon name="check-circle" size={24} color="#ff8200" />
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}

        {/* Add New Payment Method */}
        <TouchableOpacity
          onPress={() => Alert.alert("Add Payment", "Feature coming soon!")}
          style={{
            marginBottom: 24,
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
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ 
                padding: 12,
                borderRadius: 12,
                backgroundColor: '#FFF5EB',
                marginRight: 16
              }}>
                <Icon name="add" size={24} color="#ff8200" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>
                Add New Payment Method
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <View style={{ 
        paddingHorizontal: 24,
        marginTop: 'auto',
        paddingBottom: 32
      }}>
        <TouchableOpacity
          onPress={() => {
            if (!selectedMethod) {
              Alert.alert("Error", "Please select a payment method.");
              return;
            }
            navigation.goBack();
          }}
          style={{
            backgroundColor: '#ff8200',
            borderRadius: 16,
            padding: 24,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="payment" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Continue with {selectedMethod?.name || 'Payment'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentMethodScreen;
