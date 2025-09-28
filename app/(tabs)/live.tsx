import { Href, useRouter } from 'expo-router' // Import Href
import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from 'react-native'

import '../../global.css'

import { IconSymbol } from '@/components/ui/icon-symbol'

type FilterType = 'hot' | 'following'

type Stream = {
  room: {
    id: number
    title: string
    gameTitle: string
    viewCount: number
  }
  owner: {
    id: number
    username: string
    email: string
    repPoints: number
  }
}

const StreamCard = ({
  item,
  index,
  streamsLength,
}: {
  item: Stream
  index: number
  streamsLength: number
}) => {
  const router = useRouter()
  const handlePress = () => {
    router.push(`/stream/${item.room.id}` as Href)
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View
          className={`mb-6 pb-6 px-4 border-b-[1px] border-zinc-900 flex flex-col gap-y-6 ${index === 0 ? 'pt-8' : ''} ${index === streamsLength - 1 ? 'pb-64' : ''}`}
        >
          <View className='flex-grow flex items-center'>
            <Text className='text-zinc-100 text-3xl font-medium tracking-tight'>
              {item.room.title}
            </Text>
            <Text className='text-zinc-500 text-xl font-medium tracking-wide'>
              {item.room.gameTitle}
            </Text>
          </View>
          <View className='flex flex-row items-center justify-between'>
            <View className='flex flex-row gap-x-3 items-center'>
              <View className='w-12 h-12 bg-yellow-500 rounded-xl'></View>
              <View>
                <Text className='text-zinc-100 text-xl font-medium'>
                  @{item.owner.username}
                </Text>
                <Text className='text-zinc-500'>
                  {item.owner.repPoints} Rep
                </Text>
              </View>
            </View>
            <View className='flex flex-row items-center gap-x-3'>
              <Text className='text-zinc-100 text-lg font-medium'>
                {item.room.viewCount}
              </Text>
              <IconSymbol name='eye.fill' size={18} color='white' />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default function LiveScreen() {
  const [streams, setStreams] = useState<Stream[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchStreams = useCallback(async (filter: FilterType) => {
    setIsLoading(true)
    const response = await fetch(
      `http://${process.env.EXPO_PUBLIC_SERVER_IP}/rooms`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    const data = await response.json()

    if (filter === 'following') {
      setStreams(data.rooms)
    } else {
      // default to 'hot'
      setStreams(data.rooms)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchStreams('following')
  }, [fetchStreams])

  if (isLoading) {
    return (
      <View className='flex-1 items-center justify-center pt-20'>
        <ActivityIndicator size='large' color={'gold'} />
      </View>
    )
  }

  return (
    <View className='h-screen bg-zinc-950 flex flex-col'>
      <View className='pt-24 pb-8 px-8 border-b-[1px] border-zinc-900 flex flex-row items-center gap-x-4'>
        <View className='w-3 h-3 bg-red-500 rounded-xl'></View>
        <Text className='text-4xl font-extrabold text-zinc-100 tracking-wide'>
          Live Streams
        </Text>
      </View>
      <View className='bg-zinc-950 flex-grow'>
        <FlatList
          data={streams}
          keyExtractor={(item) => `room-${item.room.id}`}
          renderItem={({ item, index }) => (
            <StreamCard
              item={item}
              index={index}
              streamsLength={streams.length}
            />
          )}
        />
      </View>
    </View>
  )
}
