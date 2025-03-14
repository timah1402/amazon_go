import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from "../components/BootomNavbar";
const PurchasesScreen = () => {
  const purchases = [
    {
      store: 'DIEULDEM  - Auchan',
      date: '2 Jan 2025',
      amount: '10000 frs',
      items: ['Item 1', 'Item 2']
    },
    {
      store: 'DIEULDEM  - Carrefour',
      date: '28 Dec 2024',
      amount: '15000 frs',
      items: ['Item A', 'Item B']
    },
    {
      store: 'DIEULDEM  - Casino',
      date: '15 Dec 2024',
      amount: '9000 frs',
      items: ['Item X', 'Item Y']
    }
  ];

  return (
    <View style={[tw`h-full w-full`, { backgroundColor: '#FFF8F3' }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-24`}>
        <LinearGradient colors={['#FFF8F3', '#FFF8F3']} style={tw`pt-12 px-6 pb-6`}>
          <Text style={[tw`text-3xl font-bold`, { color: '#545454', letterSpacing: 1 }]}>Your Purchases</Text>
          <Text style={[tw`text-lg`, { color: '#ff8200' }]}>Keep track of your orders and payments</Text>
        </LinearGradient>

        <View style={tw`px-6`}>
          {purchases.map((purchase, index) => (
            <TouchableOpacity
              key={index}
              style={[
                tw`bg-white rounded-2xl p-5 mb-4`,
                {
                  borderLeftWidth: 4,
                  borderLeftColor: '#ff8200',
                  shadowColor: "#ff8200",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                }
              ]}
            >
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center`}>
                  <View style={[tw`p-3 rounded-xl mr-4`, { backgroundColor: '#FFF5EB' }]}>
                    <MaterialIcons name="receipt" size={24} color="#ff8200" />
                  </View>
                  <View>
                    <Text style={[tw`font-bold text-lg`, { color: '#545454' }]}>{purchase.store}</Text>
                    <Text style={{ color: '#666666' }}>{purchase.date}</Text>
                    <Text style={[tw`font-bold text-lg`, { color: '#ff8200' }]}>{purchase.amount}</Text>
                  </View>
                </View>
                
              </View>

              <View style={tw`mt-4`}>
                <Text style={[tw`font-bold mb-2`, { color: '#545454' }]}>Items</Text>
                <View style={tw`flex-row`}>
                  {purchase.items.map((item, idx) => (
                    <View key={idx} style={tw`flex-row items-center mr-4`}>
                      <View style={[tw`w-16 h-16 rounded-lg mr-2`, { backgroundColor: '#FFF5EB' }]} />
                      <Text style={{ color: '#666666' }}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </TouchableOpacity>
          ))}
         
        </View>
      </ScrollView>

      <View style={[
        tw`absolute bottom-0 w-full bg-white pt-2 pb-2`,
        {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 10,
        }
      ]}>
        
      </View>
      <BottomNavBar activeScreen="Purchases" />
    </View>
  );
};

export default PurchasesScreen;