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
  createBet?: createBet
  bet?: bet
}

type createBet = {
  id: number
  title: string
  betLine: number
  startTime: string
}

type bet = {
  over: number
  under: number
}

export default function Stream() {
  const { id } = useLocalSearchParams()
  const [isConnected, setIsConnected] = useState<boolean>(true)
  const [messageInput, setMessageInput] = useState<string>('')
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

    ws.current = new WebSocket(
      `ws://${process.env.EXPO_PUBLIC_WS_IP}/ws/room/${id}`,
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

  const sendMessage = (userName: string, message: string, type: string) => {
    if (ws.current && message.trim()) {
      ws.current.send(
        JSON.stringify({
          userId: user.id,
          userName: userName,
          message: message,
          time: Date.now(),
          type,
        }),
      )
      setMessageInput('')
    }
  }

  const sendStructuredMessage = ({
    message,
    createBet,
    bet,
    type,
  }: {
    message?: string
    createBet?: {
      id: number
      title: string
      betLine: number
      startTime: string
    }
    bet?: {
      over: number
      under: number
    }
    type: 'message' | 'start-bet'
  }) => {
    if (ws.current) {
      if (type === 'message') {
        ws.current.send(
          JSON.stringify({
            type: 'message',
            userId: user.id,
            userName: user.username,
            message: message,
            timeStamp: Date.now(),
          }),
        )
      }

      if (type === 'start-bet') {
        ws.current.send(
          JSON.stringify({
            type: 'start-bet',
            userId: user.id,
            userName: user.username,
            createBet,
            bet,
            timeStamp: new Date().toISOString(),
          }),
        )
      }
    }

    setMessageInput('')
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
            createBet={item.createBet}
            bet={item.bet}
            timeStamp={item.timeStamp}
            type={item.type}
          />
        )}
        ListFooterComponent={
          <View className='flex flex-row items-center'>
            <TextInput
              className='bg-zinc-900 color-white py-6 px-4 flex-grow'
              value={messageInput}
              onChangeText={setMessageInput}
              placeholder='Type a message...'
            />
            <Pressable
              className='px-4 bg-yellow-500 py-6 flex justify-center'
              onPress={() =>
                sendStructuredMessage({
                  type: 'message',
                  message: messageInput,
                })
              }
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
  message?: string
  createBet?: createBet
  bet?: bet
  timeStamp: number
  type: string
}

function StreamMessage({
  userName,
  message,
  createBet,
  bet,
  timeStamp,
  type,
}: StreamMessageProps) {
  if (type === 'message') {
    return (
      <View className='w-full flex flex-row items-center gap-x-4 rounded-lg py-8 px-2'>
        <View className='w-16 h-16 bg-yellow-500 rounded-md'></View>
        <View className='flex flex-col gap-y-2'>
          <View className='flex flex-row items-end gap-x-2'>
            <Text className='text-zinc-100'>@{userName}</Text>
            <Text className='text-zinc-500 text-xs'>
              {new Date(timeStamp).toLocaleTimeString()}
            </Text>
          </View>
          <Text className='text-zinc-100 text-xl font-medium'>{message}</Text>
        </View>
      </View>
    )
  }

  if (type === 'start-bet') {
    return (
      <View className='bg-yellow-500 w-full py-8 px-8'>
        <View className='flex flex-col gap-y-2'>
          <Text className='text-zinc-100'>QuickBet</Text>
          <Text className='text-3xl text-zinc-100 font-medium tracking-tight'>
            {createBet?.title}
          </Text>
          <Text className='text-white'>OVER / UNDER: {createBet?.betLine}</Text>
          <View className='flex flex-row justify-between gap-x-2'>
            <Pressable className='bg-zinc-900 py-2 px-8 flex items-center rounded-md'>
              <Text className='text-zinc-100'>-</Text>
            </Pressable>
            <Pressable className='bg-zinc-900 py-2 px-8 flex items-center rounded-md'>
              <Text className='text-zinc-100'>+</Text>
            </Pressable>
          </View>
        </View>
      </View>
    )
  }
}
