import React from 'react';
import { View, Text, Image } from 'react-native';
import { styled } from 'nativewind';

const ProductCard = ({ product }) => (
  <View className="border rounded-lg p-4 m-2 bg-white shadow">
    <Image source={{ uri: product.image }} className="h-40 w-full rounded" />
    <Text className="mt-2 text-lg font-bold">{product.name}</Text>
    <Text className="text-gray-600">{product.price} €</Text>
  </View>
);

export default ProductCard;
