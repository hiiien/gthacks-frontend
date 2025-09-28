import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs'
import 'react-native-reanimated'

export const unstable_settings = {
  anchor: '(tabs)',
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 10,
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeTabs>
        <NativeTabs.Trigger name="live">
          <Label>Live</Label>
          <Icon sf="circle.circle" selectedColor="gold" drawable="custom_android_drawable" />
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="profile">
          <Icon sf="gear" selectedColor="gold" drawable="custom_settings_drawable" />
          <Label>Profile</Label>
        </NativeTabs.Trigger>

        <NativeTabs.Trigger name="social">
          <Icon sf="heart" selectedColor="gold" drawable="custom_heart_drawable" />
          <Label>Social</Label>
        </NativeTabs.Trigger>

        {/* Hidden route so router.push('/(tabs)/streamerLive') works from a button */}
        <NativeTabs.Trigger name="streamerLive" hidden>
          <Icon sf="video.fill" drawable="custom_video_drawable" />
          <Label>Go Live</Label>
        </NativeTabs.Trigger>
      </NativeTabs>
    </QueryClientProvider>
  )
}
