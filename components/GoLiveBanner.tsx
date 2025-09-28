import React from 'react'
import { Pressable, Text, View, ViewStyle } from 'react-native'

export type User = {
  id: number
  username: string
  rep_points: number | string
}

type Props = {
  user: User | null | undefined
  onOpen: () => void
  containerStyle?: ViewStyle
}

export default function GoLiveBanner({ user, onOpen, containerStyle }: Props) {
  const rep = Number(user?.rep_points ?? 0)
  if (!user || rep <= 700) return null

  return (
    <View style={[{ paddingVertical: 8 }, containerStyle]}>
      <Pressable
        onPress={onOpen}
        style={{
          backgroundColor: '#22c55e',
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: 12,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: 'white', fontWeight: '800', fontSize: 16 }}>
          Go Live
        </Text>
        <Text style={{ color: 'white', opacity: 0.9, marginTop: 4 }}>
          REP: {rep}
        </Text>
      </Pressable>
    </View>
  )
}
