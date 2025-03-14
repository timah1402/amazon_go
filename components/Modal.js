import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const Modal = ({ visible, message, onClose }) => {
  if (!visible) return null;

  return (
    <View className="absolute inset-0 bg-black bg-opacity-50 justify-center items-center">
      <View className="bg-white p-6 rounded-lg w-3/4">
        <Text className="text-lg">{message}</Text>
        <TouchableOpacity
          onPress={onClose}
          className="mt-4 bg-blue-500 rounded px-4 py-2"
        >
          <Text className="text-white text-center">OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Modal;
