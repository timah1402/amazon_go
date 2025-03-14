import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ChangePasswordScreen = ({navigation}) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleUpdatePassword = () => {
    if (newPassword !== confirmPassword) {
      return;
    }
    setIsModalVisible(true);
  };

  const handleConfirmPasswordChange = () => {
    setIsModalVisible(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF8F3" }}>
      {/* Header Section */}
      <View style={{ paddingTop: 48, paddingHorizontal: 24, paddingBottom: 24 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Back Button */}
          <TouchableOpacity 
            style={{
              padding: 8,
              borderRadius: 25,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
            onPress={() => navigation.goBack()}
          >
           
            <Icon name="arrow-back" size={24} color="#ff8200" />
          </TouchableOpacity>

          {/* Title and Subtitle */}
          <View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', color: '#545454', letterSpacing: 0.5 }}>
              DIEULDEM
            </Text>
            <Text style={{ fontSize: 18, color: '#ff8200' }}>
              Change Password
            </Text>
          </View>

          {/* Notification Icon */}
          <TouchableOpacity 
            style={{
              padding: 8,
              borderRadius: 25,
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
              elevation: 3,
            }}
          >
            <Icon name="notifications" size={24} color="#ff8200" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Password Form Section */}
      <View style={{ paddingHorizontal: 24 }}>
        {/* Current Password */}
        <View style={{
          marginBottom: 32,
          backgroundColor: 'white',
          borderLeftWidth: 4,
          borderLeftColor: '#ff8200',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#FFF5EB', marginRight: 16 }}>
                <Icon name="key" size={24} color="#ff8200" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>Current Password</Text>
            </View>
            <TextInput
              secureTextEntry
              style={{
                backgroundColor: '#FFF8F3',
                borderRadius: 12,
                padding: 12,
                fontSize: 16,
              }}
              placeholder="Enter current password"
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
          </View>
        </View>

        {/* New Password */}
        <View style={{
          marginBottom: 32,
          backgroundColor: 'white',
          borderLeftWidth: 4,
          borderLeftColor: '#ff8200',
          borderRadius: 12,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 3,
        }}>
          <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
              <View style={{ padding: 12, borderRadius: 12, backgroundColor: '#FFF5EB', marginRight: 16 }}>
                <Icon name="lock" size={24} color="#ff8200" />
              </View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#545454' }}>New Password</Text>
            </View>
            <TextInput
              secureTextEntry
              style={{
                backgroundColor: '#FFF8F3',
                borderRadius: 12,
                padding: 12,
                fontSize: 16,
                marginBottom: 16,
              }}
              placeholder="Enter new password"
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              secureTextEntry
              style={{
                backgroundColor: '#FFF8F3',
                borderRadius: 12,
                padding: 12,
                fontSize: 16,
              }}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>
        </View>

        {/* Update Button */}
        <TouchableOpacity
          onPress={handleUpdatePassword}
          style={{
            backgroundColor: '#ff8200',
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check-circle" size={24} color="white" style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
              Update Password
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={{ 
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 16,
        }}>
          <View style={{
            backgroundColor: 'white',
            borderRadius: 16,
            padding: 24,
            width: '90%',
            maxWidth: 400,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#545454', marginBottom: 16 }}>
              Confirm Password Change
            </Text>
            <Text style={{ fontSize: 16, color: '#666666', marginBottom: 24 }}>
              Are you sure you want to change your password?
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 16 }}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: '#f1f1f1',
                  padding: 12,
                  borderRadius: 12,
                  minWidth: 100,
                }}
              >
                <Text style={{ textAlign: 'center', color: '#666666', fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirmPasswordChange}
                style={{
                  backgroundColor: '#ff8200',
                  padding: 12,
                  borderRadius: 12,
                  minWidth: 100,
                }}
              >
                <Text style={{ textAlign: 'center', color: 'white', fontWeight: '600' }}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ChangePasswordScreen;
