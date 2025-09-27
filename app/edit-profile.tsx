import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

export default function EditProfileScreen() {
  const [username, setUsername] = useState('@admin');
  const [displayName, setDisplayName] = useState('Administrator');
  const [bio, setBio] = useState('Streaming enthusiast and content creator');
  const [email, setEmail] = useState('admin@example.com');

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
            <Text className='text-white text-xl font-bold'>Edit Profile</Text>
            <Pressable
              onPress={() => router.back()}
              className='bg-blue-600 px-4 py-2 rounded-lg'
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#2563eb' : '#2563eb',
                  transform: [{ scale: pressed ? 0.95 : 1 }]
                }
              ]}
            >
              <Text className='text-white font-medium'>Save</Text>
            </Pressable>
          </View>
        </View>

        <View className='px-6 pt-6'>
          {/* Profile Picture Section */}
          <View className='items-center mb-8'>
            <View className='w-32 h-32 rounded-full bg-white/90 items-center justify-center mb-4 shadow-lg'>
              <Text className='text-black text-4xl font-bold'>A</Text>
            </View>
            <Pressable
              className='bg-zinc-700 px-6 py-2 rounded-lg'
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                  transform: [{ scale: pressed ? 0.95 : 1 }]
                }
              ]}
            >
              <Text className='text-white font-medium'>Change Photo</Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View className='space-y-6'>
            {/* Username */}
            <View>
              <Text className='text-zinc-400 text-sm mb-1'>Username</Text>
              <TextInput
                value={username}
                onChangeText={setUsername}
                className='bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700'
                placeholderTextColor='#71717a'
                placeholder='Enter username'
              />
            </View>

            {/* Display Name */}
            <View>
              <Text className='text-zinc-400 text-sm mb-1'>Display Name</Text>
              <TextInput
                value={displayName}
                onChangeText={setDisplayName}
                className='bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700'
                placeholderTextColor='#71717a'
                placeholder='Enter display name'
              />
            </View>

            {/* Email */}
            <View>
              <Text className='text-zinc-400 text-sm mb-1'>Email</Text>
              <TextInput
                value={email}
                onChangeText={setEmail}
                className='bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700'
                placeholderTextColor='#71717a'
                placeholder='Enter email'
                keyboardType='email-address'
                autoCapitalize='none'
              />
            </View>

            {/* Bio */}
            <View>
              <Text className='text-zinc-400 text-sm mb-1'>Bio</Text>
              <TextInput
                value={bio}
                onChangeText={setBio}
                className='bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700 h-24'
                placeholderTextColor='#71717a'
                placeholder='Tell us about yourself'
                multiline
                textAlignVertical='top'
              />
            </View>

            {/* Social Links */}
            <View>
              <Text className='text-zinc-400 text-sm mb-1'>Social Links</Text>
              <View className='space-y-3'>
                <TextInput
                  className='bg-zinc-900 text-white px-4 py-3 rounded-lg border border-zinc-700'
                  placeholderTextColor='#71717a'
                  placeholder='Twitter URL'
                />
                <TextInput
                  className='bg-zinc-900 text-white px-4 py-3 rounded-lg border mt-2 border-zinc-700'
                  placeholderTextColor='#71717a'
                  placeholder='Instagram URL'
                />
                <TextInput
                  className='bg-zinc-900 text-white px-4 py-3 rounded-lg border mt-2 border-zinc-700'
                  placeholderTextColor='#71717a'
                  placeholder='YouTube URL'
                />
              </View>
            </View>

            {/* Privacy Settings */}
            <View className='bg-zinc-900 rounded-lg p-4 mt-6'>
              <Text className='text-white font-semibold mb-4'>Privacy Settings</Text>
              <View className='space-y-3'>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-zinc-300'>Make profile public</Text>
                  <View className='w-12 h-6 bg-white/70 mb-2 rounded-full items-center justify-center'>
                    <View className='w-5 h-5 bg-white rounded-full ml-3'></View>
                  </View>
                </View>
                <View className='flex-row justify-between items-center'>
                  <Text className='text-zinc-300'>Show email to followers</Text>
                  <View className='w-12 h-6 bg-zinc-700 rounded-full items-center justify-center'>
                    <View className='w-5 h-5 bg-white rounded-full'></View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Save Button */}
          <Pressable
            className='bg-gray-500 w-full py-4 rounded-lg items-center mt-8 mb-8'
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? 'gray' : 'black',
                transform: [{ scale: pressed ? 0.98 : 1 }]
              }
            ]}
          >
            <Text className='text-white font-semibold text-lg'>Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
