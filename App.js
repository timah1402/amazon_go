import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import tw from 'tailwind-react-native-classnames';

// Import screens
import LoginScreen from './screenns/LoginScreen';
import RegisterScreen from './screenns/RegisterScrenn';
import HomeScreen from './screenns/HomeScreen';
import ScanScreen from './screenns/ScanScreen';
import CartScreen from './screenns/CartScreen';
import StoreEntryScreen from './screenns/StoreEntryScreen';
import StoreScreen from './screenns/StoreScreen';
import PurchasesScreen from './screenns/PurchasesScreen';
import AccountScreen from './screenns/AccountScreen';
import ChangePasswordScreen from './screenns/ChangePasswordScreen';
import PaymentMethodScreen from './screenns/PaymentMethodScreen';
import AddressBookScreen from './screenns/AddressBookScreen';
import AddAddressScreen from './screenns/AddAddressScreen';
import EditAddressScreen from './screenns/EditAddressScreen';
import NotificationScreen from './screenns/NotificationScreen';
import AdditionalInfoScreen from './screenns/AdditionalInfoScreen';
// Create Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="ScanScreen" 
      component={ScanScreen} 
      options={{ headerShown: false }} /> 
        {/* Define all screens */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen name="StoreEntryScreen" component={StoreEntryScreen} options={{ headerShown: false }} />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        
        <Stack.Screen
          name="CartScreen"
          component={CartScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="StoreEntry" 
          component={StoreEntryScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Store" 
          component={StoreScreen} 
          options={{ headerShown:false }} 
        />
        <Stack.Screen 
          name="Purchases" 
          component={PurchasesScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Account" 
          component={AccountScreen} 
          options={{ headerShown: false }} 
        />
         <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
  name="PaymentMethods"
  component={PaymentMethodScreen}
  options={{ headerShown: false }} 
/>
<Stack.Screen name="AddressBook" component={AddressBookScreen}  options={{ headerShown: false }} />
<Stack.Screen name="AddAddress" component={AddAddressScreen} options={{ headerShown: false }}  />
<Stack.Screen name="EditAddress" component={EditAddressScreen} options={{ headerShown: false }} />
<Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
<Stack.Screen name="AddInfo" component={AdditionalInfoScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
  
}
