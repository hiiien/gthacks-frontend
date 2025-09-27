import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../contexts/AuthContext';

import '../../global.css';

export default function ProfileScreen() {
  const { logout } = useAuth();
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/landing');
  };

  return (
    <SafeAreaView className='flex-1 bg-zinc-950'>
      <ScrollView className='flex-1 bg-zinc-950'>
        {/* Header Section */}
        <View className='px-6 pt-8 pb-8'>
        <View className='items-center mb-8'>
          <View className='w-32 h-32 rounded-full bg-white/90 items-center justify-center mb-4 shadow-lg'>
            <Text className='text-black text-4xl font-bold'>A</Text>
          </View>
          <Text className='text-white text-2xl font-bold mb-2'>@admin</Text>
          <Text className='text-zinc-400 text-base'>Administrator</Text>
        </View>

        {/* Stats Cards */}
        <View className='flex-row justify-between mb-8'>
          <View className='flex-1 bg-zinc-900 rounded-xl p-4 mr-2'>
            <Text className='text-zinc-400 text-sm mb-1'>Streams</Text>
            <Text className='text-white text-2xl font-bold'>12</Text>
          </View>
          <View className='flex-1 bg-zinc-900 rounded-xl p-4 mx-1'>
            <Text className='text-zinc-400 text-sm mb-1'>Followers</Text>
            <Text className='text-white text-2xl font-bold'>1.2K</Text>
          </View>
          <View className='flex-1 bg-zinc-900 rounded-xl p-4 ml-2'>
            <Text className='text-zinc-400 text-sm mb-1'>Views</Text>
            <Text className='text-white text-2xl font-bold'>45K</Text>
          </View>
        </View>

        {/* Account Info Card */}
        <View className='bg-zinc-900 rounded-xl p-6 mb-6'>
          <Text className='text-white text-lg font-semibold mb-4'>Account Information</Text>
          <View className='space-y-3'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-zinc-400'>Status</Text>
              <View className='bg-green-500 px-3 py-1 rounded-full'>
                <Text className='text-white text-sm font-medium'>Active</Text>
              </View>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='text-zinc-400'>Role</Text>
              <Text className='text-white font-medium'>Administrator</Text>
            </View>
            <View className='flex-row justify-between items-center'>
              <Text className='text-zinc-400'>Member Since</Text>
              <Text className='text-white font-medium'>Sep 2025</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className='space-y-4'>
          <Pressable
            onPress={() => router.push('/edit-profile')}
            className='bg-gray-500 w-full py-4 mb-2 rounded-md flex items-center shadow-lg'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#6b7280' : '#6b7280',
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text className='text-white font-semibold text-base'>Edit Profile</Text>
          </Pressable>
          
          <Pressable
            onPress={() => router.push('/settings')}
            className='bg-zinc-700 w-full py-4 mb-2 rounded-md flex items-center'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text className='text-white font-semibold text-base'>Settings</Text>
          </Pressable>
          
          <Pressable
            onPress={() => router.push('/help')}
            className='bg-zinc-700 w-full py-4 mb-2 rounded-md flex items-center'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text className='text-white font-semibold text-base'>Help & Support</Text>
          </Pressable>
          
          <Pressable
            onPress={() => setShowLogoutPopup(true)}
            className='bg-red-600/50 w-full py-4 mb-2 rounded-md flex items-center shadow-lg mt-6'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? '#dc2626' : '#dc2626',
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text className='text-white font-semibold text-base'>Logout</Text>
          </Pressable>
        </View>
        </View>
      </ScrollView>

      {/* Logout Popup */}
      {showLogoutPopup && (
        <View className="absolute inset-0 bg-black/70 justify-center items-center z-50">
          <View className="bg-zinc-900 rounded-2xl p-6 mx-6 w-80 border border-zinc-700 shadow-2xl">
            {/* Icon */}
            <View className="items-center mb-6">
              <View className="w-16 h-16 bg-red-500/20 rounded-full items-center justify-center mb-4 border-2 border-red-500/30">
                <Text className="text-red-500 text-2xl">⚠️</Text>
              </View>
              <Text className="text-white text-xl font-bold text-center mb-2">
                Logout Confirmation
              </Text>
              <Text className="text-zinc-400 text-center leading-6">
                Are you sure you want to logout? You'll need to sign in again to access your account.
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-row space-x-3">
              <Pressable
                onPress={() => setShowLogoutPopup(false)}
                className="flex-1 bg-zinc-700 py-3 rounded-xl items-center mr-2"
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className="text-white font-semibold">Cancel</Text>
              </Pressable>
              
              <Pressable
                onPress={handleLogout}
                className="flex-1 bg-red-600 py-3 rounded-xl items-center"
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#dc2626' : '#dc2626',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className="text-white font-semibold">Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  )
}
