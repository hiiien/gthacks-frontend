import { Image } from 'expo-image';
import { Href, useRouter } from 'expo-router'; // Import Href
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, RefreshControl, StyleSheet, View } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useThemeColor } from '@/hooks/use-theme-color';

// Mock data for "Hot" streams. In a real app, this would come from an API.
const HOT_STREAMS_DATA = [
  { id: '1', title: 'NBA Finals Game 7: Hawks vs Lakers', viewers: 12800, broadcasterName: 'SportsFanatic21', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/2c5282/FFFFFF?text=NBA+Finals', reputation: 1250 },
  { id: '2', title: 'Analyzing the First Half Props - TNF', viewers: 8500, broadcasterName: 'BettingGuru', isFollowing: false, thumbnailUrl: 'https://placehold.co/600x400/2d3748/FFFFFF?text=TNF+Live', reputation: 870 },
  { id: '3', title: 'UFC Main Event - Live Reactions & Bets', viewers: 22000, broadcasterName: 'MMA_Insider', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/c53030/FFFFFF?text=UFC', reputation: 5200 },
  { id: '4', title: 'CS:GO Major - Grand Final Breakdown', viewers: 950, broadcasterName: 'eSportsCapper', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/718096/FFFFFF?text=CS:GO', reputation: 610 },
  { id: '5', title: 'MLB Homerun Derby - Prop Bet Watchalong', viewers: 5600, broadcasterName: 'BaseballBets', isFollowing: false, thumbnailUrl: 'https://placehold.co/600x400/2c7a7b/FFFFFF?text=MLB+HR+Derby', reputation: 2300 },
  { id: '6', title: 'Chill Sunday Soccer Bets', viewers: 450, broadcasterName: 'SoccerSharp', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/d69e2e/FFFFFF?text=Soccer', reputation: 980 },
  { id: '7', title: 'Live F1 Race Day Strategy Session', viewers: 18400, broadcasterName: 'F1_Fanatic', isFollowing: false, thumbnailUrl: 'https://placehold.co/600x400/9b2c2c/FFFFFF?text=F1+Live', reputation: 3100 },
  { id: '8', title: 'Late Night Tennis Match Bets', viewers: 2100, broadcasterName: 'TennisOracle', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/4a5568/FFFFFF?text=Tennis', reputation: 750 },
];

// Mock data for "Following" streams.
const FOLLOWING_STREAMS_DATA = [
  { id: '3', title: 'UFC Main Event - Live Reactions & Bets', viewers: 22000, broadcasterName: 'MMA_Insider', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/c53030/FFFFFF?text=UFC', reputation: 5200 },
  { id: '1', title: 'NBA Finals Game 7: Hawks vs Lakers', viewers: 12800, broadcasterName: 'SportsFanatic21', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/2c5282/FFFFFF?text=NBA+Finals', reputation: 1250 },
  { id: '9', title: 'Exclusive: F1 Paddock Walk & Talk', viewers: 7800, broadcasterName: 'F1_Fanatic', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/e53e3e/FFFFFF?text=F1+Paddock', reputation: 3100 },
  { id: '4', title: 'CS:GO Major - Grand Final Breakdown', viewers: 950, broadcasterName: 'eSportsCapper', isFollowing: true, thumbnailUrl: 'https://placehold.co/600x400/718096/FFFFFF?text=CS:GO', reputation: 610 },
];

type Stream = (typeof HOT_STREAMS_DATA)[0];
type FilterType = 'hot' | 'following';

const StreamCard = ({ item }: { item: Stream }) => {
  const router = useRouter();
  const handlePress = () => {
    router.push(`/stream/${item.id}` as Href);
  };

  return (
    <Pressable onPress={handlePress}>
      {({ pressed }) => (
        <ThemedView 
          className="rounded-2xl overflow-hidden bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700 shadow-sm"
          style={{ opacity: pressed ? 0.7 : 1 }}
        >
          <View className="w-full aspect-video relative">
            <Image source={{ uri: item.thumbnailUrl }} className="absolute inset-0 w-full h-full bg-neutral-200 dark:bg-neutral-700" />
            <View className="absolute top-3 left-3 bg-red-400 px-2 py-1 rounded-md">
              <ThemedText className="text-white text-xs font-bold tracking-widest">REP: {item.reputation.toLocaleString()}</ThemedText>
            </View>
          </View>
          <View className="p-4">
            <ThemedText type="defaultSemiBold" className="text-base" numberOfLines={1}>{item.title}</ThemedText>
            <View className="flex-row justify-between items-center mt-2">
              <ThemedText className="text-sm text-neutral-500 dark:text-neutral-400">{item.broadcasterName}</ThemedText>
              <View className="flex-row items-center gap-1.5">
                <IconSymbol name="eye.fill" size={12} color="#808080" />
                <ThemedText className="text-sm text-neutral-500 dark:text-neutral-400 font-semibold">{item.viewers.toLocaleString()}</ThemedText>
              </View>
            </View>
          </View>
        </ThemedView>
      )}
    </Pressable>
  );
};

export default function LiveScreen() {
  const [activeFilter, setActiveFilter] = useState<FilterType>('hot');
  const [streams, setStreams] = useState<Stream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const primaryColor = useThemeColor({ light: '#3B82F6', dark: '#3B82F6' }, 'text');
  const hotColor = useThemeColor({ light: '#ce1313ff', dark: '#df5317ff' }, 'text'); // Red-500

  const fetchStreams = useCallback(async (filter: FilterType) => {
    setIsLoading(true);
    // Simulate a network request
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (filter === 'following') {
      setStreams(FOLLOWING_STREAMS_DATA);
    } else { // default to 'hot'
      setStreams(HOT_STREAMS_DATA);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchStreams(activeFilter);
  }, [activeFilter, fetchStreams]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchStreams(activeFilter);
    setIsRefreshing(false);
  }, [activeFilter, fetchStreams]);

  const sortedStreams = useMemo(() => {
    return [...streams].sort((a, b) => b.viewers - a.viewers);
  }, [streams]);
  
  const renderContent = () => {
    if (isLoading) {
      return (
        <View className="flex-1 items-center justify-center pt-20">
          <ActivityIndicator size="large" color={primaryColor} />
        </View>
      );
    }

    return (
      <View className="gap-y-6">
        <View className="flex-row gap-3">
          <Pressable 
            onPress={() => setActiveFilter('hot')} 
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'hot' ? 'bg-red-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
            <IconSymbol name="flame.fill" size={14} color={activeFilter === 'hot' ? '#FFFFFF' : hotColor} />
            <ThemedText className={`${activeFilter === 'hot' ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}>
              Hot
            </ThemedText>
          </Pressable>
          <Pressable 
            onPress={() => setActiveFilter('following')}
            className={`flex-row items-center gap-2 px-4 py-2 rounded-full ${activeFilter === 'following' ? 'bg-blue-500' : 'bg-neutral-200 dark:bg-neutral-800'}`}>
            <IconSymbol name="heart.fill" size={14} color={activeFilter === 'following' ? '#FFFFFF' : '#808080'} />
            <ThemedText className={`${activeFilter === 'following' ? 'text-white' : 'text-neutral-600 dark:text-neutral-400'} font-bold text-sm`}>
              Following
            </ThemedText>
          </Pressable>
        </View>

        <FlatList
          data={sortedStreams}
          renderItem={({ item }) => <StreamCard item={item} />}
          keyExtractor={item => item.id}
          scrollEnabled={false}
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListEmptyComponent={
            <ThemedView className="mt-5 items-center justify-center p-5 rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <ThemedText>No live streams found for this filter.</ThemedText>
            </ThemedView>
          }
        />
      </View>
    );
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#1A1A1A' }}
      headerImage={
        <ThemedView style={styles.headerContainer}>
          <ThemedText type="title">Live Streams</ThemedText>
        </ThemedView>
      }
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} tintColor={primaryColor} />
      }>
      {renderContent()}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height:150,
    justifyContent: 'flex-end', 
    alignItems: 'center',      
    backgroundColor: 'transparent',
  },
});