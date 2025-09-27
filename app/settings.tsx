import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [autoPlay, setAutoPlay] = useState(false);
  const [dataSaver, setDataSaver] = useState(false);

  return (
    <SafeAreaView className='flex-1 bg-zinc-950'>
      <ScrollView className='flex-1 bg-zinc-950'>
        {/* Header */}
        <View className='px-6 pt-4 pb-6 border-b border-zinc-800'>
          <View className='flex-row items-center justify-between'>
            <Pressable
              onPress={() => router.back()}
              className='bg-zinc-800 px-4 py-2 rounded-lg'
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#27272a' : '#27272a',
                  transform: [{ scale: pressed ? 0.95 : 1 }]
                }
              ]}
            >
              <Text className='text-white font-medium'>← Back</Text>
            </Pressable>
            <Text className='text-white text-xl font-bold'>Settings</Text>
            <View className='w-16'></View>
          </View>
        </View>

        <View className='px-6 pt-6'>
          {/* Account Settings */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Account</Text>
            <View className='bg-zinc-900 rounded-xl overflow-hidden'>
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Change Password</Text>
                    <Text className='text-zinc-400 text-sm'>Update your account password</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Two-Factor Authentication</Text>
                    <Text className='text-zinc-400 text-sm'>Add extra security to your account</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Delete Account</Text>
                    <Text className='text-red-400 text-sm'>Permanently delete your account</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* App Settings */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>App Settings</Text>
            <View className='bg-zinc-900 rounded-xl overflow-hidden'>
              <View className='px-4 py-4 border-b border-zinc-800'>
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Push Notifications</Text>
                    <Text className='text-zinc-400 text-sm'>Receive notifications for new content</Text>
                  </View>
                  <Pressable
                    onPress={() => setNotifications(!notifications)}
                    className={`w-12 h-6 rounded-full ${notifications ? 'bg-blue-600' : 'bg-zinc-700'}`}
                    style={({ pressed }) => [
                      {
                        transform: [{ scale: pressed ? 0.95 : 1 }]
                      }
                    ]}
                  >
                    <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${notifications ? 'ml-3' : 'ml-0.5'}`}></View>
                  </Pressable>
                </View>
              </View>
              
              <View className='px-4 py-4 border-b border-zinc-800'>
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Dark Mode</Text>
                    <Text className='text-zinc-400 text-sm'>Use dark theme throughout the app</Text>
                  </View>
                  <Pressable
                    onPress={() => setDarkMode(!darkMode)}
                    className={`w-12 h-6 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-zinc-700'}`}
                    style={({ pressed }) => [
                      {
                        transform: [{ scale: pressed ? 0.95 : 1 }]
                      }
                    ]}
                  >
                    <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${darkMode ? 'ml-3' : 'ml-0.5'}`}></View>
                  </Pressable>
                </View>
              </View>
              
              <View className='px-4 py-4 border-b border-zinc-800'>
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Auto-play Videos</Text>
                    <Text className='text-zinc-400 text-sm'>Automatically play videos in feed</Text>
                  </View>
                  <Pressable
                    onPress={() => setAutoPlay(!autoPlay)}
                    className={`w-12 h-6 rounded-full ${autoPlay ? 'bg-blue-600' : 'bg-zinc-700'}`}
                    style={({ pressed }) => [
                      {
                        transform: [{ scale: pressed ? 0.95 : 1 }]
                      }
                    ]}
                  >
                    <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${autoPlay ? 'ml-3' : 'ml-0.5'}`}></View>
                  </Pressable>
                </View>
              </View>
              
              <View className='px-4 py-4'>
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Data Saver</Text>
                    <Text className='text-zinc-400 text-sm'>Reduce data usage for streaming</Text>
                  </View>
                  <Pressable
                    onPress={() => setDataSaver(!dataSaver)}
                    className={`w-12 h-6 rounded-full ${dataSaver ? 'bg-blue-600' : 'bg-zinc-700'}`}
                    style={({ pressed }) => [
                      {
                        transform: [{ scale: pressed ? 0.95 : 1 }]
                      }
                    ]}
                  >
                    <View className={`w-5 h-5 bg-white rounded-full mt-0.5 ${dataSaver ? 'ml-3' : 'ml-0.5'}`}></View>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>

          {/* Streaming Settings */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Streaming</Text>
            <View className='bg-zinc-900 rounded-xl overflow-hidden'>
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Stream Quality</Text>
                    <Text className='text-zinc-400 text-sm'>1080p HD</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Audio Quality</Text>
                    <Text className='text-zinc-400 text-sm'>High Quality</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Stream Key</Text>
                    <Text className='text-zinc-400 text-sm'>Manage your streaming credentials</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* About */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>About</Text>
            <View className='bg-zinc-900 rounded-xl overflow-hidden'>
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>App Version</Text>
                    <Text className='text-zinc-400 text-sm'>1.0.0</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4 border-b border-zinc-800'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Terms of Service</Text>
                    <Text className='text-zinc-400 text-sm'>Read our terms and conditions</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
              
              <Pressable
                className='px-4 py-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : 'transparent',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row justify-between items-center'>
                  <View>
                    <Text className='text-white font-medium'>Privacy Policy</Text>
                    <Text className='text-zinc-400 text-sm'>How we handle your data</Text>
                  </View>
                  <Text className='text-zinc-400'>›</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
