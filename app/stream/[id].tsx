import { useAuth } from '@/contexts/AuthContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FlatList,
  TextInput,
  View,
  Text,
  Pressable,
  ActivityIndicator,
} from 'react-native'
import { User } from '../(tabs)/profile'

type Room = {
  gameId: number
  id: number
  ownerId: number
  title: string
  viewCount: number
}

type message = {
  userId: number
  userName: string
  type: string
  timeStamp: string
  betType?: string
  message?: string
  createBet?: bet
}

type bet = {
  id: number
  title: string
  betLine: number
  startTime: string
}

export default function Stream() {
  const { id } = useLocalSearchParams()
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [room, setRoom] = useState<Room | null>()
  const [user, setUser] = useState<User | null>()
  const [messages, setMessages] = useState<StreamMessageProps[]>([])
  const ws = useRef<WebSocket | null>(null)
  const router = useRouter()
  const { getUser } = useAuth()

  const fetchRoom = useCallback(async (roomId: number) => {
    setLoading(true)
    console.log('loading room')
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_IP}/room/${roomId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()
    console.log(data.room)
    setRoom(data.room)
    setLoading(false)
  }, [])

  const fetchUser = useCallback(async () => {
    setLoading(true)
    console.log('loading user')

    const getUserRes = await getUser()
    if (!getUserRes) {
      setLoading(false)
      return
    }

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_SERVER_IP}/user/${getUserRes.userId}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()

    setUser(data.user)
    setLoading(false)
  }, [getUser])

  useEffect(() => {
    fetchRoom(Number(id))
    fetchUser()

    console.log(`wss://${process.env.EXPO_PUBLIC_WS_IP}/ws/room/${id}`)

    ws.current = new WebSocket(
      `wss://${process.env.EXPO_PUBLIC_WS_IP}/ws/room/${id}`,
    )

    ws.current.onopen = () => {
      setIsConnected(true)
    }

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      setMessages((prev) => [...prev, message])
    }

    ws.current.onclose = () => {
      setIsConnected(false)
    }

    if (!isConnected) {
      router.replace('/live')
    }

    return () => {
      ws.current?.close()
    }
  }, [id, fetchRoom, fetchUser, isConnected, router])

  if (!room || !user || loading) {
    return (
      <View className='h-screen bg-zinc-950 flex items-center justify-center pt-20'>
        <ActivityIndicator size='large' color={'gold'} />
      </View>
    )
  }

  const sendMessage = (userName: string, message: string) => {
    if (ws.current && message.trim()) {
      ws.current.send(
        JSON.stringify({
          userId: user.id,
          userName: userName,
          message: message,
          time: Date.now(),
          type: 'message',
        }),
      )
      setMessages((prev) => [...prev, { userName, message, time: Date.now() }])
      setMessage('')
    }
  }

  return (
    <View className='h-screen bg-zinc-950 flex flex-col'>
      <View className='pt-24 pb-8 px-8 border-b-[1px] border-zinc-900 flex flex-row items-center gap-x-4'>
        <View className='w-3 h-3 bg-red-500 rounded-xl'></View>
        <Text className='text-4xl font-extrabold text-zinc-100 tracking-wide'>
          {room.title}
        </Text>
      </View>
      <FlatList
        automaticallyAdjustKeyboardInsets={true}
        keyboardShouldPersistTaps='always'
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <StreamMessage
            userName={item.userName}
            message={item.message}
            time={item.time} // ✅ pass number
          />
        )}
        ListHeaderComponent={
          <View>
            <Pressable
              className='px-4 bg-yellow-500 w-full py-6 flex justify-center'
              onPress={() => sendMessage(user.username, message)}
            >
              <Text className='text-zinc-100 font-medium'>Send Bet</Text>
            </Pressable>
          </View>
        }
        ListFooterComponent={
          <View className='flex flex-row items-center'>
            <TextInput
              className='bg-zinc-900 color-white py-6 px-4 flex-grow'
              value={message}
              onChangeText={setMessage}
              placeholder='Type a message...'
            />
            <Pressable
              className='px-4 bg-yellow-500 py-6 flex justify-center'
              onPress={() => sendMessage(user.username, message)}
            >
              <Text className='text-zinc-100 font-medium'>Send</Text>
            </Pressable>
          </View>
        }
      />
    </View>
  )
}

type StreamMessageProps = {
  userName: string
  message: string
  time: number
}

function StreamMessage({ userName, message, time }: StreamMessageProps) {
  return (
    <View className='w-full flex flex-col gap-y-2 mb-4 p-4 rounded-lg'>
      <Text className='text-white'>{userName}</Text>
      <Text className='text-white'>{message}</Text>
      <Text className='text-white'>{new Date(time).toLocaleTimeString()}</Text>
    </View>
  )
}
