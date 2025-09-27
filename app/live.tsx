import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';

const STREAMS_DATA = [
  { id: '1', title: 'NBA Finals Game 7: Hawks vs Lakers', viewers: 12800, broadcasterName: 'SportsFanatic21', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/222/FFF?text=NBA+Finals' },
  { id: '2', title: 'Analyzing the First Half Props - TNF', viewers: 8500, broadcasterName: 'BettingGuru', isFollowing: false, thumbnailUrl: 'https://placehold.co/600x400/333/EEE?text=TNF+Live' },
  { id: '3', title: 'UFC Main Event - Live Reactions & Bets', viewers: 22000, broadcasterName: 'MMA_Insider', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/444/DDD?text=UFC+Main+Event' },
  { id: '4', title: 'CS:GO Major - Grand Final Breakdown', viewers: 950, broadcasterName: 'eSportsCapper', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/555/CCC?text=CS:GO' },
  { id: '5', title: 'MLB Homerun Derby - Prop Bet Watchalong', viewers: 5600, broadcasterName: 'BaseballBets', isFollowing: false, thumbnailUrl: 'https://placehold.co/600x400/666/BBB?text=MLB+HR+Derby' },
  { id: '6', title: 'Chill Sunday Soccer Bets', viewers: 450, broadcasterName: 'SoccerSharp', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/777/AAA?text=Soccer' },
];

type Stream = (typeof STREAMS_DATA)[0];
type FilterType = 'hot' | 'following';

const StreamCard = ({ item }: { item: Stream }) => {
  return (
    <ThemedView className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 shadow-md">
      <View className="w-full aspect-video relative">
        <Image source={{ uri: item.thumbnailUrl }} className="absolute inset-0 w-full h-full" />
        <View className="absolute top-3 left-3 bg-red-500 px-2 py-1 rounded-md">
          <ThemedText className="text-white text-xs font-bold tracking-widest">LIVE</ThemedText>
        </View>
        <View className="absolute bottom-3 left-3 bg-black/60 px-2 py-1 rounded-md flex-row items-center gap-1.5">
          <IconSymbol name="eye.fill" size={12} color="#FFF" />
          <ThemedText className="text-white text-xs font-semibold">{item.viewers.toLocaleString()}</ThemedText>
        </View>
      </View>
      <View className="p-3">
        <ThemedText type="defaultSemiBold" className="text-base" numberOfLines={1}>{item.title}</ThemedText>
        <ThemedText className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">{item.broadcasterName}</ThemedText>
      </View>
    </ThemedView>
  );
};

export default function LiveScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('hot');
  const [streams, setStreams] = useState<Stream[]>([]);

  useEffect(() => {
    setStreams(STREAMS_DATA);
  }, []);

  const filteredStreams = useMemo(() => {
    let sortedStreams = [...streams];
    if (activeFilter === 'hot') {
      return sortedStreams.sort((a, b) => b.viewers - a.viewers);
    }
    return sortedStreams.filter(stream => stream.isFollowing).sort((a, b) => b.viewers - a.viewers);
  }, [streams, activeFilter]);
  
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#F0F0F0', dark: '#1A1A1A' }}
      headerImage={
        <IconSymbol
          size={280}
          color="#808080"
          name="video.badge.waveform"
          style={styles.headerImage}
        />
      }>
      <ThemedView className="p-8 gap-y-4">
        <ThemedText type="title">Live Streams</ThemedText>

        <View className="flex-row gap-3">
          <Pressable 
            onPress={() => setActiveFilter('hot')} 
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'hot' ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
            <IconSymbol name="flame.fill" size={14} color={activeFilter === 'hot' ? '#FFF' : '#808080'} />
            <ThemedText className={`${activeFilter === 'hot' ? 'text-white dark:text-black' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}>
              Hot
            </ThemedText>
          </Pressable>
          <Pressable 
            onPress={() => setActiveFilter('following')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'following' ? 'bg-black dark:bg-white' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
            <IconSymbol name="heart.fill" size={14} color={activeFilter === 'following' ? '#FFF' : '#808080'} />
            <ThemedText className={`${activeFilter === 'following' ? 'text-white dark:text-black' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}>
              Following
            </ThemedText>
          </Pressable>
        </View>

        <FlatList
          data={filteredStreams}
          renderItem={({ item }) => <StreamCard item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListEmptyComponent={
            <ThemedView className="mt-5 items-center justify-center p-5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <ThemedText>No live streams from broadcasters you follow right now.</ThemedText>
            </ThemedView>
          }
        />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    bottom: -60,
    alignSelf: 'center',
  },
});

