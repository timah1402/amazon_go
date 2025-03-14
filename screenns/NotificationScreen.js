import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import Icon from 'react-native-vector-icons/MaterialIcons';

const NotificationScreen = ({ navigation }) => {
  const [sound, setSound] = useState();
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 2000 },
    { id: 2, name: 'Item 2', price: 500 },
    { id: 3, name: 'Item 3', price: 800 },
  ]);
  const [userBalance, setUserBalance] = useState(10000); // Example balance
  const [alertTriggered, setAlertTriggered] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (totalPrice > userBalance && !alertTriggered) {
      setAlertTriggered(true);
      Alert.alert(
        "Insufficient Balance",
        "Your cart exceeds your available balance. Remove items to proceed.",
        [
          { text: "OK" },
        ]
      );
      playSound();
    }
  }, [totalPrice]);

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/alert.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
    }
  };

  const removeItem = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const checkBalance = () => {
    if (totalPrice <= userBalance) {
      stopSound();
      Alert.alert("Balance Sufficient", "Your balance is now sufficient to purchase the items.");
    } else {
      Alert.alert("Balance Insufficient", "You need to remove more items to proceed.");
    }
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
              Notifications
            </Text>
            <Text style={{ fontSize: 18, color: '#ff8200' }}>
              Manage Your Cart
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

      {/* Cart Item List */}
      <ScrollView style={{ paddingHorizontal: 24 }} showsVerticalScrollIndicator={false}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#545454', marginBottom: 16 }}>
          Your Cart
        </Text>
        {cartItems.map((item) => (
          <TouchableOpacity
            key={item.id}
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
            <View style={{ padding: 20, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>{item.name}</Text>
                <Text style={{ color: '#666666', marginTop: 4 }}>{item.price} frs</Text>
              </View>
              <TouchableOpacity
                onPress={() => removeItem(item.id)}
                style={{
                  backgroundColor: '#ff0000',
                  borderRadius: 8,
                  padding: 8,
                }}
              >
                <Icon name="delete" size={20} color="white" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        {/* Balance and Total Price */}
        <View style={{ marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>
            Total Price: {totalPrice} frs
          </Text>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454', marginTop: 4 }}>
            Your Balance: {userBalance} frs
          </Text>
        </View>

        {/* Check Balance Button */}
        <TouchableOpacity
          onPress={checkBalance}
          style={{
            backgroundColor: '#ff8200',
            borderRadius: 16,
            padding: 16,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            marginBottom: 32,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
            Check Balance
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;
