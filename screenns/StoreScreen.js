import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import BottomNavBar from "../components/BootomNavbar";
const StoreScreen = () => {
  return (
    <View style={[tw`h-full w-full`, { backgroundColor: '#FFF8F3' }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        // Adds padding at bottom for navigation bar
        bounces={true} // Adds bounce effect
        overScrollMode="always"
      >
        {/* Header Section with Gradient */}
        <LinearGradient
          colors={['#FFF8F3', '#FFF8F3']}
          style={tw`pt-12 px-6 pb-6`}
        >
          <View>
            <Text style={[tw`text-2xl font-bold`, { color: '#545454' }]}>Stores Near You</Text>
            <Text style={[tw`text-lg mt-2`, { color: '#666666' }]}>Explore stores and shop your favorites!</Text>
          </View>
        </LinearGradient>

        {/* Store List */}
        <View style={tw`px-6`}>
          {["Auchan ", "Carrefour"].map((location, index) => (
            <TouchableOpacity 
              key={location}
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
              <View style={tw`flex-row items-center mb-4`}>
                <View style={[tw`p-3 rounded-xl mr-4`, { backgroundColor: '#FFF5EB' }]}>
                  <MaterialIcons name="store" size={24} color="#ff8200" />
                </View>
                <View>
                  <Text style={[tw`font-bold text-lg`, { color: '#545454' }]}>DIEULDEM {location}</Text>
                  <Text style={{ color: '#666666' }}>{index === 0 ? 'Saly center' : 'Saly pordudal'}</Text>
                  <View style={tw`flex-row items-center mt-2`}>
                    <MaterialIcons name="location-on" size={16} color="#ff8200" />
                    <Text style={{ color: '#ff8200' }}>{index === 0 ? '0.5' : '1.2'} km away</Text>
                  </View>
                </View>
              </View>

              <View>
                <Text style={[tw`font-bold mb-3`, { color: '#545454' }]}>Popular Items</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {[1, 2, 3].map((item) => (
                    <View key={item} style={tw`mr-4`}>
                      <View 
                        style={[
                          tw`w-20 h-20 rounded-xl overflow-hidden`,
                          {
                            shadowColor: "#ff8200",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 2,
                          }
                        ]}
                      >
                        <Image 
                          source={{ uri: "https://via.placeholder.com/100" }} 
                          style={tw`w-full h-full`}
                        />
                      </View>
                      <Text style={[tw`text-center mt-2`, { color: '#666666' }]}>Item {item}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <BottomNavBar activeScreen="Store" />
    </View>
  );
};

export default StoreScreen;