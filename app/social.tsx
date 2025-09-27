import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { ThemedText } from '@/components/themed-text'
import { ThemedView } from '@/components/themed-view'
import { SafeAreaView } from 'react-native-safe-area-context'

export type Post = {
  id: number
  userName: string
  title: string
  text: string
  over: number
  under: number
  hitPercent: number
  repAmt: number
}

const testPosts: Post[] = [
  {
    id: 1,
    userName: 'LanWen',
    title: 'First Prediction',
    text: 'I think the Lakers will win by 10 points tonight.',
    over: 120,
    under: 85,
    hitPercent: 58,
    repAmt: 12,
  },
  {
    id: 2,
    userName: 'JuliaK',
    title: 'Stock Market Bet',
    text: 'TSLA will close above $250 this Friday.',
    over: 200,
    under: 150,
    hitPercent: 65,
    repAmt: 25,
  },
  {
    id: 3,
    userName: 'Gavin',
    title: 'Weather Wager',
    text: 'It’ll rain in Atlanta tomorrow afternoon.',
    over: 75,
    under: 130,
    hitPercent: 36,
    repAmt: 8,
  },
  {
    id: 4,
    userName: 'SportsFan99',
    title: 'NFL Sunday',
    text: 'Eagles will beat the Cowboys by 7+ points.',
    over: 310,
    under: 280,
    hitPercent: 52,
    repAmt: 40,
  },
  {
    id: 5,
    userName: 'CryptoBro',
    title: 'Bitcoin Call',
    text: 'BTC will hit $75k before year end.',
    over: 420,
    under: 390,
    hitPercent: 52,
    repAmt: 100,
  },
  {
    id: 6,
    userName: 'LanWen',
    title: 'First Prediction',
    text: 'I think the Lakers will win by 10 points tonight.',
    over: 120,
    under: 85,
    hitPercent: 58,
    repAmt: 12,
  },
  {
    id: 7,
    userName: 'JuliaK',
    title: 'Stock Market Bet',
    text: 'TSLA will close above $250 this Friday.',
    over: 200,
    under: 150,
    hitPercent: 65,
    repAmt: 25,
  },
  {
    id: 8,
    userName: 'Gavin',
    title: 'Weather Wager',
    text: 'It’ll rain in Atlanta tomorrow afternoon.',
    over: 75,
    under: 130,
    hitPercent: 36,
    repAmt: 8,
  },
  {
    id: 9,
    userName: 'SportsFan99',
    title: 'NFL Sunday',
    text: 'Eagles will beat the Cowboys by 7+ points.',
    over: 310,
    under: 280,
    hitPercent: 52,
    repAmt: 40,
  },
  {
    id: 10,
    userName: 'CryptoBro',
    title: 'Bitcoin Call',
    text: 'BTC will hit $75k before year end.',
    over: 420,
    under: 390,
    hitPercent: 52,
    repAmt: 100,
  },
]

export default function Social() {
  const [posts, setPosts] = useState<Post[]>([])

  useEffect(() => {
    setPosts(testPosts)
  }, [])

  return (
    <View className='h-screen bg-zinc-950'>
      <SafeAreaView>
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Card {...item} />}
          contentContainerStyle={styles.list}
        />
      </SafeAreaView>
    </View>
  )
}

function Card({ userName, title, text }: Post) {
  return (
    <View className='bg-zinc-900 rounded-lg h-fit p-6 w-full flex flex-col gap-y-4 mb-4'>
      <View className='rounded-lg flex flex-row items-center justify-between'>
        <View className='flex flex-row items-center gap-x-2'>
          <View className='w-12 h-12 rounded-full bg-zinc-500'></View>
          <Text className='text-white font-medium text-lg'>@{userName}</Text>
        </View>
        <Text className='text-white font-semibold text-lg tracking-tight'>
          {title}
        </Text>
      </View>
      <Text className='text-zinc-300'>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
})
