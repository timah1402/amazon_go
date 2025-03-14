import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const CustomButton = styled(TouchableOpacity, {
  className: "bg-blue-500 rounded-lg px-4 py-2 mt-4",
});

const Button = ({ label, onPress }) => (
  <CustomButton onPress={onPress}>
    <Text className="text-white text-center">{label}</Text>
  </CustomButton>
);

export default Button;
