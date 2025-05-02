import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import tw from "tailwind-react-native-classnames";
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [lastEntry, setLastEntry] = useState(null);

  useEffect(() => {
    const userId = auth().currentUser?.uid;
    if (userId) {
      // Fetch the last entry to determine the active user
      const unsubscribeEntries = firestore()
        .collection("entries")
        .orderBy("time", "desc") // Use 'time' field as per your screenshot
        .limit(1)
        .onSnapshot((snapshot) => {
          if (!snapshot.empty) {
            const lastEntryData = snapshot.docs[0].data();
            const entryId = snapshot.docs[0].id;
            setLastEntry({ id: entryId, ...lastEntryData });
          }
        }, (error) => {
          console.error("Error fetching last entry:", error);
        });

      // Fetch cart items for the current user
      const unsubscribeCart = firestore()
        .collection("users")
        .doc(userId)
        .collection("cart")
        .onSnapshot(async (querySnapshot) => {
          const items = [];
          let total = 0;

          for (const doc of querySnapshot.docs) {
            const { itemId, quantity } = doc.data();
            const itemDoc = await firestore()
              .collection("items")
              .doc(itemId)
              .get();
            const price = itemDoc.exists ? itemDoc.data().price : 0;
            items.push({ itemId, quantity, price });
            total += quantity * price;
          }

          setCartItems(items);
          setTotalPrice(total);
        }, (error) => {
          console.error("Error fetching cart items:", error);
        });

      return () => {
        unsubscribeEntries();
        unsubscribeCart();
      };
    }
  }, []);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <SafeAreaView style={[tw`h-full w-full`, { backgroundColor: "#FFF8F3" }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-24`}
        bounces={true}
        overScrollMode="always"
      >
        <LinearGradient
          colors={["#FFF8F3", "#FFF8F3"]}
          style={tw`pt-12 px-6`}
        >
          <Text style={[tw`text-2xl font-bold`, { color: "#545454" }]}>
            Your Cart
          </Text>
          <Text style={[tw`text-lg mt-2`, { color: "#666666" }]}>
            Check the items you've added.
          </Text>
        </LinearGradient>

        {totalItems === 0 ? (
          <View style={tw`mt-6 mx-6`}>
            <View
              style={[
                tw`rounded-2xl p-4`,
                {
                  backgroundColor: "#FFF5EB",
                  borderLeftWidth: 4,
                  borderLeftColor: "#ff8200",
                  shadowColor: "#ff8200",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 4,
                  elevation: 3,
                },
              ]}
            >
              <Text style={[tw`font-bold`, { color: "#545454" }]}>
                0 items
              </Text>
              <Text style={{ color: "#666666" }}>
                Your cart is currently empty.
              </Text>
            </View>
          </View>
        ) : (
          <View style={tw`mt-6 mx-6`}>
            {cartItems.map((item) => (
              <View
                key={item.itemId}
                style={[
                  tw`rounded-2xl p-4 mb-4`,
                  {
                    backgroundColor: "#FFF5EB",
                    shadowColor: "#ff8200",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    elevation: 3,
                  },
                ]}
              >
                <Text style={[tw`font-bold`, { color: "#545454" }]}>
                  {item.itemId}
                </Text>
                <Text style={{ color: "#666666" }}>
                  Quantity: {item.quantity}
                </Text>
                <Text style={{ color: "#666666" }}>
                  Price: ${item.price.toFixed(2)}
                </Text>
              </View>
            ))}
            <View style={tw`mt-6`}>
              <Text style={[tw`font-bold`, { color: "#545454" }]}>
                Total Items: {totalItems}
              </Text>
              <Text style={[tw`font-bold`, { color: "#545454" }]}>
                Total Price: ${totalPrice.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
        {lastEntry && (
          <View style={tw`mt-6 mx-6`}>
            <Text style={[tw`font-bold`, { color: "#545454" }]}>
              Last Entry ID: {lastEntry.id}
            </Text>
            <Text style={{ color: "#666666" }}>
              User ID: {lastEntry.userId}
            </Text>
            <Text style={{ color: "#666666" }}>
              Time: {lastEntry.time}
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;