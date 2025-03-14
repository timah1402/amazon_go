import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import tw from 'tailwind-react-native-classnames';
import { useNavigation } from '@react-navigation/native';

const BottomNavBar = ({ activeScreen }) => {
  const navigation = useNavigation();

  // Define the navigation buttons
  const navItems = [
    { name: "Home", icon: "home", label: "Home" },
    { name: "Store", icon: "store", label: "Stores" },
    { name: "Purchases", icon: "receipt", label: "Orders" },
    { name: "Account", icon: "person", label: "Profile" },
  ];

  return (
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
      <View style={tw`flex-row justify-around`}>
        {navItems.map((item) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => navigation.navigate(item.name)}
            style={tw`items-center px-4 py-1`}
          >
            <View style={[
              tw`p-2 rounded-full`,
              item.name === activeScreen && { backgroundColor: '#FFF5EB' }
            ]}>
              <MaterialIcons
                name={item.icon}
                size={24}
                color={item.name === activeScreen ? '#ff8200' : '#545454'}
              />
            </View>
            <Text style={[
              tw`text-xs mt-1`,
              {
                color: item.name === activeScreen ? '#ff8200' : '#545454',
                fontWeight: item.name === activeScreen ? 'bold' : 'normal',
              }
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default BottomNavBar;
