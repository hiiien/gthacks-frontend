import { Image } from 'expo-image'
import { Href, useRouter } from 'expo-router' // Import Href
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import ParallaxScrollView from '@/components/parallax-scroll-view'
import { IconSymbol } from '@/components/ui/icon-symbol'
import { useThemeColor } from '@/hooks/use-theme-color'

type FilterType = 'hot' | 'following'

type Stream = {
  room: {
    id: number
    title: string
    viewCount: number
  }
  owner: {
    id: number
    username: string
    email: string
    repPoints: number
  }
}

const StreamCard = ({ item }: { item: Stream }) => {
  const router = useRouter()
  const handlePress = () => {
    router.push(`/stream/${item.room.id}` as Href)
  }

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <View
          className='rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 shadow-sm'
          style={{ opacity: pressed ? 0.7 : 1 }}
        >
          <View className='w-full aspect-video relative'>
            <View className='absolute top-3 left-3 bg-red-400 px-2 py-1 rounded-md'>
              <Text className='text-white text-xs font-bold tracking-widest'>
                REP: {item.owner.repPoints.toLocaleString()}
              </Text>
            </View>
          </View>
          <View className='p-4'>
            <Text className='font-semibold'>{item.room.title}</Text>
            <View className='flex-row justify-between items-center mt-2'>
              <Text className='text-sm text-neutral-500 dark:text-neutral-400'>
                {item.owner.username}
              </Text>
              <View className='flex-row items-center gap-1.5'>
                <IconSymbol name='eye.fill' size={12} color='#808080' />
                <Text className='text-sm text-neutral-500 dark:text-neutral-400 font-semibold'>
                  {item.room.viewCount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  )
}

export default function LiveScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('hot')
  const [streams, setStreams] = useState<Stream[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const primaryColor = useThemeColor(
    { light: '#3B82F6', dark: '#3B82F6' },
    'text',
  )
  const hotColor = useThemeColor(
    { light: '#ce1313ff', dark: '#df5317ff' },
    'text',
  ) // Red-500

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
    fetchStreams(activeFilter)
  }, [activeFilter, fetchStreams])

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true)
    await fetchStreams(activeFilter)
    setIsRefreshing(false)
  }, [activeFilter, fetchStreams])

  const renderContent = () => {
    if (isLoading) {
      return (
        <View className='flex-1 items-center justify-center pt-20'>
          <ActivityIndicator size='large' color={primaryColor} />
        </View>
      )
    }

    return (
      <View className='gap-y-6'>
        <View className='flex-row gap-3'>
          <Pressable
            onPress={() => setActiveFilter('hot')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'hot' ? 'bg-red-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}
          >
            <IconSymbol
              name='flame.fill'
              size={14}
              color={activeFilter === 'hot' ? '#FFFFFF' : hotColor}
            />
            <Text
              className={`${activeFilter === 'hot' ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}
            >
              Hot
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setActiveFilter('following')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'following' ? 'bg-blue-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}
          >
            <IconSymbol
              name='heart.fill'
              size={14}
              color={activeFilter === 'following' ? '#FFFFFF' : '#808080'}
            />
            <Text
              className={`${activeFilter === 'following' ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}
            >
              Following
            </Text>
          </Pressable>
        </View>

        <FlatList
          data={streams}
          renderItem={({ item }) => <StreamCard item={item} />}
          keyExtractor={(item) => `room-${item.room.id}`}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className='h-4' />}
          ListEmptyComponent={
            <View className='mt-5 items-center justify-center p-5 rounded-lg bg-neutral-100 dark:bg-neutral-800'>
              <Text>No live streams found for this filter.</Text>
            </View>
          }
        />
      </View>
    )
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1A1A1A' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Text className='text-zinc-50 text-3xl font-semibold'>
            Live Streams
          </Text>
        </View>
      }
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          tintColor={primaryColor}
        />
      }
    >
      {renderContent()}
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
})
