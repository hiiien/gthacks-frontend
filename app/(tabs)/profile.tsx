import { router } from 'expo-router';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

import '../../global.css';

export default function ProfileScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: async () => {
            await logout();
            router.replace('/landing');
          }
        }
      ]
    );
  };

  return (
    <View className='h-screen bg-zinc-900 flex flex-col'>
      <View className='px-8 pt-20 pb-8 gap-y-6'>
        <View className='flex flex-row items-end gap-x-4'>
          <View className='w-24 h-24 rounded-lg bg-zinc-300'></View>
          <Text className='text-zinc-50 text-3xl font-semibold'>@username</Text>
        </View>

        {/* Stats Cards */}
        <View className='flex-row justify-between mb-8'>
          <View className='flex-1 bg-zinc-800 rounded-xl p-4 mr-2'>
            <Text className='text-zinc-400 text-sm mb-1'>Streams</Text>
            <Text className='text-white text-2xl font-bold'>12</Text>
          </View>
          <View className='flex-1 bg-zinc-800 rounded-xl p-4 mx-1'>
            <Text className='text-zinc-400 text-sm mb-1'>Followers</Text>
            <Text className='text-white text-2xl font-bold'>1.2K</Text>
          </View>
          <View className='flex-1 bg-zinc-800 rounded-xl p-4 ml-2'>
            <Text className='text-zinc-400 text-sm mb-1'>Views</Text>
            <Text className='text-white text-2xl font-bold'>45K</Text>
          </View>
        </View>

        {/* Account Info Card */}
        <View className='bg-zinc-800 rounded-xl p-6 mb-6'>
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
              <Text className='text-white font-medium'>Jan 2024</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View className='space-y-4'>
          <Pressable
            onPress={() => Alert.alert('Edit Profile', 'Profile editing feature coming soon!')}
            className='bg-blue-600 w-full py-4 rounded-xl flex items-center shadow-lg'
          >
            <Text className='text-white font-semibold text-base'>Edit Profile</Text>
          </Pressable>
          
          <Pressable
            onPress={() => Alert.alert('Settings', 'Settings feature coming soon!')}
            className='bg-zinc-700 w-full py-4 rounded-xl flex items-center'
          >
            <Text className='text-white font-semibold text-base'>Settings</Text>
          </Pressable>
          
          <Pressable
            onPress={() => Alert.alert('Help', 'Help feature coming soon!')}
            className='bg-zinc-700 w-full py-4 rounded-xl flex items-center'
          >
            <Text className='text-white font-semibold text-base'>Help & Support</Text>
          </Pressable>
          
          <Pressable
            onPress={handleLogout}
            className='bg-red-600 w-full py-4 rounded-xl flex items-center shadow-lg mt-6'
          >
            <Text className='text-white font-semibold text-base'>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  )
}
