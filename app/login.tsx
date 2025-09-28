import { router } from 'expo-router'
import { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useAuth } from '../contexts/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password')
      return
    }

    setIsLoading(true)
    try {
      const success = await login(email.trim(), password.trim())
      if (success) {
        router.replace('/(tabs)/live')
      } else {
        Alert.alert(
          'Login Failed',
          'Invalid username or password. Please try again.',
        )
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <View className='h-screen px-8 bg-zinc-950 flex items-center justify-center'>
      <View className='w-full flex gap-y-6'>
        <View className='flex flex-col items-center gap-y-2'>
          <Text className='text-zinc-100 text-4xl font-semibold tracking-tight'>
            Welcome Back
          </Text>
          <Text className='text-zinc-400'>Sign in to your account</Text>
        </View>

        <View className='w-full flex flex-col gap-y-4'>
          <TextInput
            className='bg-zinc-900 color-white w-full p-4 rounded-md'
            value={email}
            onChangeText={setEmail}
            placeholder='Email'
            autoCapitalize='none'
            autoCorrect={false}
          />

          <TextInput
            className='bg-zinc-900 color-white w-full p-4 rounded-md'
            value={password}
            onChangeText={setPassword}
            placeholder='Enter your password'
            secureTextEntry
            autoCapitalize='none'
            autoCorrect={false}
          />

          <Pressable
            className='px-4 py-2 bg-yellow-500 w-fit mx-auto rounded-full'
            onPress={handleLogin}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color='white' />
            ) : (
              <Text className='text-zinc-100 text-lg font-medium'>Sign In</Text>
            )}
          </Pressable>
        </View>
      </View>
    </View>
  )
}
