import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const StoreEntryScreen = ({ navigation }) => {
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
      colors={["#FFF8F3", "#FFF8F3"]}
      style={tw`flex-row items-center pt-12 px-6 pb-4`}
>
  {/* Back Button */}
  <TouchableOpacity
    onPress={() => navigation.navigate("ScanScreen")} // Go back to previous screen
    style={[tw`p-2 -ml-2 rounded-full`, { backgroundColor: "#FFF8F3" }]}
  >
    <MaterialIcons name="arrow-back" size={24} color="#ff8200" />
  </TouchableOpacity>
  
</LinearGradient>
       <LinearGradient
         colors={['#FFF8F3', '#FFF8F3']}
         style={tw`pt-12 px-6`}
       >
         <Text style={[tw`text-2xl font-bold`, { color: '#545454' }]}>Welcome to</Text>
         <Text style={[tw`text-3xl font-bold`, { color: '#ff8200' }]}>DIEULDEM Auchan</Text>
       </LinearGradient>

       {/* Success Message */}
       <View style={[
         tw`mt-6 mx-6 rounded-2xl p-4`,
         {
           backgroundColor: '#E8FFF3',
           borderLeftWidth: 4,
           borderLeftColor: '#059669',
           shadowColor: "#059669",
           shadowOffset: { width: 0, height: 2 },
           shadowOpacity: 0.1,
           shadowRadius: 4,
           elevation: 3,
         }
       ]}>
         <View style={tw`flex-row items-center`}>
           <MaterialIcons name="check-circle" size={24} color="#059669" />
           <Text style={tw`ml-2 text-green-700 font-bold`}>Entry Authorized</Text>
         </View>
         <Text style={tw`text-green-600 mt-1`}>Door is unlocked</Text>
       </View>

       {/* Instructions */}
       <View style={tw`mt-8 px-6`}>
         <Text style={[tw`text-lg font-bold mb-4`, { color: '#545454' }]}>How to Shop</Text>
         
         <View style={[
           tw`rounded-2xl p-4`,
           {
             backgroundColor: 'white',
             shadowColor: "#ff8200",
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.1,
             shadowRadius: 4,
             elevation: 3,
           }
         ]}>
           {[
             { step: '1', title: 'Take your items', desc: 'Simply take the items you want' },
             { step: '2', title: 'No need to scan', desc: 'Our sensors automatically detect your items' },
             { step: '3', title: 'Just walk out', desc: 'Your account will be charged automatically' }
           ].map((item, index) => (
             <View key={index} style={tw`flex-row items-center ${index < 2 ? 'mb-4' : ''}`}>
               <View style={[tw`w-8 h-8 rounded-full items-center justify-center`, { backgroundColor: '#ff8200' }]}>
                 <Text style={tw`text-white font-bold`}>{item.step}</Text>
               </View>
               <View style={tw`ml-3 flex-1`}>
                 <Text style={[tw`font-bold`, { color: '#545454' }]}>{item.title}</Text>
                 <Text style={{ color: '#666666' }}>{item.desc}</Text>
               </View>
             </View>
           ))}
         </View>
       </View>

       {/* Current Cart */}
       <View style={tw`mt-8 px-6`}>
         <Text style={[tw`text-lg font-bold mb-4`, { color: '#545454' }]}>Your Cart</Text>
         <View style={[
           tw`rounded-2xl p-4`,
           {
             backgroundColor: '#FFF5EB',
             shadowColor: "#ff8200",
             shadowOffset: { width: 0, height: 2 },
             shadowOpacity: 0.1,
             shadowRadius: 4,
             elevation: 3,
           }
         ]}>
           <View style={tw`flex-row justify-between items-center`}>
             <View>
               <Text style={[tw`font-bold`, { color: '#545454' }]}>Current Session</Text>
               <Text style={{ color: '#666666' }}>0 items</Text>
             </View>
             <TouchableOpacity 
               style={[tw`px-4 py-2 rounded-lg`, { backgroundColor: '#ff8200' }]}
               onPress={() => navigation.navigate('CartScreen')}
             >
               <Text style={tw`text-white font-bold`}>View Cart</Text>
             </TouchableOpacity>
           </View>
         </View>
       </View>
     </ScrollView>
   </SafeAreaView>
 );
};

export default StoreEntryScreen;