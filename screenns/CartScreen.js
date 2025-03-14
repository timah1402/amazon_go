import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const CartScreen = ({ navigation }) => {  // Add 'navigation' prop
  return (
    <SafeAreaView style={[tw`h-full w-full`, { backgroundColor: '#FFF8F3' }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        bounces={true}
        overScrollMode="always"
      >
        {/* Header */}
        <LinearGradient
          colors={['#FFF8F3', '#FFF8F3']}
          style={tw`pt-12 px-6`}
        >
          <Text style={[tw`text-2xl font-bold`, { color: '#545454' }]}>Your Cart</Text>
          <Text style={[tw`text-lg mt-2`, { color: '#666666' }]}>
            Check the items you've added.
          </Text>
        </LinearGradient>

        {/* Empty Cart Message */}
        <View style={tw`mt-6 mx-6`}>
          <View style={[
            tw`rounded-2xl p-4`,
            {
              backgroundColor: '#FFF5EB',
              borderLeftWidth: 4,
              borderLeftColor: '#ff8200',
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }
          ]}>
            <Text style={[tw`font-bold`, { color: '#545454' }]}>0 items</Text>
            <Text style={{ color: '#666666' }}>Your cart is currently empty.</Text>
          </View>
        </View>

        {/* Return to Store Button */}
        <View style={tw`mt-6 mx-6`}>
          <TouchableOpacity 
            style={[
              tw`px-6 py-3 rounded-2xl`,
              {
                backgroundColor: '#ff8200',
                shadowColor: "#ff8200",
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }
            ]}
            onPress={() => navigation.navigate('StoreEntryScreen')}  // Add the navigation logic here
          >
            <Text style={tw`text-white font-semibold text-lg text-center`}>
              Return to Store
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
