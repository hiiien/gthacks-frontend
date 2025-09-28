import { router } from 'expo-router'
import { ActivityIndicator, Alert, Pressable, Text, View } from 'react-native'
import { useAuth } from '../../contexts/AuthContext'

import '../../global.css'
import { useCallback, useEffect, useState } from 'react'
import { IconSymbol } from '@/components/ui/icon-symbol'

export type User = {
  id: number
  username: string
  email: string
  repPoints: number
}

export default function ProfileScreen() {
  const { logout, getUser } = useAuth()

  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<User | null>()

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout()
          router.replace('/landing')
        },
      },
    ])
  }

  const fetchUser = useCallback(async () => {
    setLoading(true)
    console.log('loading user')

    const getUserRes = await getUser()
    if (!getUserRes) {
      setLoading(false)
      return
    }

    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}/user/${getUserRes.userId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()

    if (!data.user) {
      setLoading(false)
      await logout()
      return
    }

    setUser(data.user)
    setLoading(false)
  }, [getUser])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  if (!user || loading) {
    return (
      <View className='h-screen bg-zinc-950 flex items-center justify-center pt-20 gap-y-6'>
        <ActivityIndicator size='large' color={'gold'} />
        <Pressable
          onPress={handleLogout}
          className='bg-red-600 w-fit px-4 py-2 rounded-full flex items-center'
        >
          <Text className='text-white font-semibold text-base'>Logout</Text>
        </Pressable>
      </View>
    )
  }

  return (
    <View className='h-screen bg-zinc-950 flex flex-col'>
      <View className='px-8 pt-20 pb-8 gap-y-6'>
        <View className='flex flex-row items-end gap-x-4'>
          <View className='w-24 h-24 rounded-lg bg-yellow-500'></View>
          <Text className='text-5xl font-extrabold text-zinc-100 tracking-wider'>
            @{user.username}
          </Text>
        </View>

        {/* Stats Cards */}
        <View className='flex-row justify-between'>
          <View className='flex items-start'>
            <Text className='text-zinc-400 text-sm mb-1'>Rep</Text>
            <Text className='text-white text-2xl font-bold'>
              {user.repPoints}
            </Text>
          </View>
          <View className='flex items-center'>
            <Text className='text-zinc-400 text-sm mb-1'>
              Lifetime Earnings
            </Text>
            <Text className='text-white text-2xl font-bold'>$1.2K</Text>
          </View>
          <View className='flex items-end'>
            <Text className='text-zinc-400 text-sm mb-1'>Views</Text>
            <Text className='text-white text-2xl font-bold'>45K</Text>
          </View>
        </View>

        {/* Account Info Card */}
        <View className='bg-zinc-800 rounded-xl p-6 mb-6'>
          <Text className='text-white text-lg font-semibold mb-4'>
            Account Information
          </Text>
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
          <View className='flex flex-row items-center justify-between'>
            <Pressable
              onPress={() =>
                Alert.alert(
                  'Edit Profile',
                  'Profile editing feature coming soon!',
                )
              }
            >
              <Text className='text-zinc-400'>Edit Profile</Text>
              <IconSymbol name='pencil.line' size={32} color='white' />
            </Pressable>

            <Pressable
              onPress={() =>
                Alert.alert('Settings', 'Settings feature coming soon!')
              }
            >
              <Text className='text-zinc-400'>Settings</Text>
              <IconSymbol name='gear' size={32} color='white' />
            </Pressable>

            <Pressable
              onPress={() => Alert.alert('Help', 'Help feature coming soon!')}
            >
              <Text className='text-zinc-400'>Help</Text>
              <IconSymbol
                name='questionmark.app.fill'
                size={32}
                color='white'
              />
            </Pressable>
          </View>

          <Pressable
            onPress={handleLogout}
            className='bg-red-600 w-full py-4 rounded-xl flex items-center shadow-lg mt-6'
          >
            <Text className='text-white font-semibold text-base'>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
