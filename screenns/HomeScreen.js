import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import BottomNavBar from "../components/BootomNavbar";
const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);

  const checkUserProfile = async () => {
    try {
      setIsLoading(true);
      const user = auth.currentUser;
      
      if (!user) {
        Alert.alert("Authentication Required", "Please log in to continue");
        navigation.navigate('Login');
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        // If both photoURL (selfie) and phoneNumber exist and are not empty,
        // navigate directly to ScanScreen
        if (userData.selfie?.trim() && userData.phoneNumber?.trim()) {
          navigation.navigate('ScanScreen');
        } else {
          // If either photoURL or phoneNumber is missing or empty,
          // navigate to AddInfo
          navigation.navigate('AddInfo');
        }
      } else {
        // If no user document exists at all, navigate to AddInfo
        navigation.navigate('AddInfo');
      }
    } catch (error) {
      console.error("Error checking user profile:", error);
      Alert.alert("Error", "Something went wrong. Please try again.");
      navigation.navigate('AddInfo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={[tw`h-full w-full`, { backgroundColor: "#FFF8F3" }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}
        bounces={true}
        overScrollMode="always"
      >
        {/* Header Section with Gradient */}
        <LinearGradient colors={["#FFF8F3", "#FFF8F3"]} style={tw`pt-12 px-6 pb-6`}>
          <View style={tw`flex-row justify-between items-center`}>
            <View>
              <Text style={[tw`text-3xl font-bold`, { color: "#545454", letterSpacing: 1 }]}>
                DIEULDEM
              </Text>
              <Text style={[tw`text-lg`, { color: "#ff8200" }]}>
                Welcome back, Fatima! 👋
              </Text>
            </View>
            <TouchableOpacity
              style={[
                tw`p-2 rounded-full`,
                {
                  backgroundColor: "white",
                  shadowColor: "#ff8200",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 3,
                  elevation: 2,
                },
              ]}
            >
              <MaterialIcons name="notifications-none" size={24} color="#ff8200" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        {/* Scan Section */}
        <TouchableOpacity 
          onPress={checkUserProfile}
          disabled={isLoading}
          style={[
            tw`mx-6 rounded-2xl`,
            {
              backgroundColor: '#ff8200',
              shadowColor: "#ff8200",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 8,
              opacity: isLoading ? 0.7 : 1,
            }
          ]}
        >
          <LinearGradient
            colors={['#ff8200', '#ff9933']}
            style={tw`p-6 rounded-2xl`}
          >
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <View>
                  <Text style={[tw`text-2xl font-bold text-white mb-2`, { letterSpacing: 0.5 }]}>
                    Solde: 12000 CFA
                  </Text>
                </View>
                <View style={tw`flex-row items-center`}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="white" style={tw`mr-3`} />
                  ) : (
                    <MaterialIcons name="qr-code-scanner" size={28} color="white" />
                  )}
                  <Text style={[tw`text-2xl font-bold ml-3 text-white`, { letterSpacing: 0.5 }]}>
                    Scan & Go
                  </Text>
                </View>
                <Text style={tw`text-white opacity-90 mt-2 text-base`}>
                  Quick scan to enter store
                </Text>
              </View>
              <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Nearby Stores */}
        <View style={tw`mt-8 px-6`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={[tw`text-xl font-bold`, { color: '#545454' }]}>Nearby Stores</Text>
            <TouchableOpacity>
              <Text style={{ color: '#ff8200' }}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {["Auchan", "Carrefour"].map((location, index) => (
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
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center flex-1`}>
                  <View style={[tw`p-3 rounded-xl mr-4`, { backgroundColor: '#FFF5EB' }]}>
                    <MaterialIcons name="store" size={24} color="#ff8200" />
                  </View>
                  <View style={tw`flex-1`}>
                    <Text style={[tw`font-bold text-lg`, { color: '#545454' }]}>DIEULDEM {location}</Text>
                    <Text style={{ color: '#666666' }}>{index === 0 ? 'Saly center' : 'Saly pordudal'}</Text>
                    <View style={tw`flex-row items-center mt-2`}>
                      <MaterialIcons name="location-on" size={16} color="#ff8200" />
                      <Text style={{ color: '#ff8200' }}>{index === 0 ? '0.5' : '1.2'} km away</Text>
                    </View>
                  </View>
                </View>
                <MaterialIcons name="chevron-right" size={24} color="#ff8200" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Purchases */}
        <View style={tw`mt-6 px-6 mb-8`}>
          <View style={tw`flex-row justify-between items-center mb-4`}>
            <Text style={[tw`text-xl font-bold`, { color: '#545454' }]}>Recent Purchases</Text>
            <TouchableOpacity>
              <Text style={{ color: '#ff8200' }}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {[
            { store: 'Auchan', date: '2 Jan 2025', amount: '5000 frs' },
            { store: 'Carrefour', date: '1 Jan 2025', amount: '24000 frs' }
          ].map((purchase, index) => (
            <TouchableOpacity 
              key={index}
              style={[
                tw`bg-white rounded-2xl p-5 mb-4`,
                {
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
                  </View>
                </View>
                <Text style={[tw`font-bold text-lg`, { color: '#ff8200' }]}>{purchase.amount}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View><BottomNavBar activeScreen="Home" /></View>
      
    </View>
  );
};

export default HomeScreen;