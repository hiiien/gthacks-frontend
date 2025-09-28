import { Link, router } from 'expo-router'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'

export default function LandingPage() {
  return (
    <View className='h-screen bg-zinc-950 flex items-center justify-center'>
      <View className='flex items-center gap-y-6'>
        <View className='flex items-center'>
          <Text className='text-zinc-100 text-4xl font-semibold tracking-tight'>
            Social Gambling
          </Text>
          <Text className='text-zinc-400'>Win big, brag about it.</Text>
        </View>

        <Pressable className='bg-yellow-500 px-4 py-2 rounded-full'>
          <Link href={'/login'}>
            <Text className='text-zinc-100 text-lg font-medium'>
              Get Started
            </Text>
          </Link>
        </Pressable>
      </View>
    </View>
  )
}
