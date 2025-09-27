import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useLocalSearchParams, Stack } from 'expo-router'
import { useThemeColor } from '@/hooks/use-theme-color'
import { IconSymbol } from '@/components/ui/icon-symbol'

type Room = {
  id: number
  title: string 
  owner: {
    id: number
    username: string
  }
}

type ChatMessage = {
  id: string | number
  userId: number
  username: string
  text: string
  createdAt: string // ISO
}

export default function StreamRoomScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const roomId = Number(id)

  const primary = useThemeColor({ light: '#3B82F6', dark: '#3B82F6' }, 'text')
  const subtle = useThemeColor({ light: '#6B7280', dark: '#9CA3AF' }, 'text')

  const [room, setRoom] = useState<Room | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)

  const wsRef = useRef<WebSocket | null>(null)
  const pollRef = useRef<NodeJS.Timeout | null>(null)

  const serverHttp = useMemo(
    () => `http://${process.env.EXPO_PUBLIC_SERVER_IP}`,
    [],
  )
  const serverWs = useMemo(
    () => `ws://${process.env.EXPO_PUBLIC_SERVER_IP}`,
    [],
  )

  const fetchRoom = useCallback(async () => {
    const res = await fetch(`${serverHttp}/rooms/${roomId}`)
    const data = await res.json()
    // Expect: { room: { id, title, owner: { id, username } } }
    setRoom(data.room)
  }, [roomId, serverHttp])

  const fetchMessages = useCallback(async () => {
    // Expect: { messages: ChatMessage[] } sorted ascending by createdAt
    const res = await fetch(`${serverHttp}/rooms/${roomId}/messages`)
    const data = await res.json()
    setMessages(data.messages ?? [])
  }, [roomId, serverHttp])

  const connectWs = useCallback(() => {
    try {
      const ws = new WebSocket(`${serverWs}/rooms/${roomId}/ws`)
      wsRef.current = ws

      ws.onopen = () => {
        // console.log('WS connected')
      }

      ws.onmessage = (evt) => {
        try {
          const payload = JSON.parse(evt.data)
          // Support two formats: single message or batch
          if (Array.isArray(payload)) {
            setMessages(payload)
          } else if (payload?.type === 'message' || payload?.text) {
            setMessages((prev) => [...prev, payload as ChatMessage])
          }
        } catch {}
      }

      ws.onerror = () => {
        // Fallback to polling if WS errors
        if (!pollRef.current) {
          pollRef.current = setInterval(fetchMessages, 3000)
        }
      }

      ws.onclose = () => {
        // Attempt soft fallback (don’t reconnect storm)
        if (!pollRef.current) {
          pollRef.current = setInterval(fetchMessages, 3000)
        }
      }
    } catch {
      if (!pollRef.current) {
        pollRef.current = setInterval(fetchMessages, 3000)
      }
    }
  }, [roomId, serverWs, fetchMessages])

  const sendMessage = useCallback(async () => {
    if (!input.trim()) return
    setSending(true)
    const body = { text: input.trim() }
    try {
      // Prefer POST; your server can also broadcast to WS listeners
      await fetch(`${serverHttp}/rooms/${roomId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(body),
      })
      setInput('')
      // If WS isn’t active, immediately refetch
      if (!wsRef.current || wsRef.current.readyState !== 1) {
        await fetchMessages()
      }
    } catch {
    } finally {
      setSending(false)
    }
  }, [input, roomId, serverHttp, fetchMessages])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        await Promise.all([fetchRoom(), fetchMessages()])
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    connectWs()
    return () => {
      mounted = false
      if (wsRef.current) {
        wsRef.current.close()
        wsRef.current = null
      }
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
    }
  }, [fetchRoom, fetchMessages, connectWs])

  if (loading || !room) {
    return (
      <SafeAreaView className='flex-1 bg-white dark:bg-black items-center justify-center'>
        <ActivityIndicator size='large' color={primary} />
      </SafeAreaView>
    )
  }

  return (
    <>
      <Stack.Screen options={{ title: room.title ?? `Stream ${room.id}` }} />
      <SafeAreaView className='flex-1 bg-white dark:bg-black'>
        {/* Header block: host → match */}
        <View className='px-4 pt-2 pb-3 border-b border-neutral-200 dark:border-neutral-800'>
          <Text className='text-xl font-semibold'>
            {room.owner?.username ?? 'Host'}
          </Text>
          <Text className='text-base mt-1 text-neutral-600 dark:text-neutral-300'>
            {room.title ?? 'Match'}
          </Text>
        </View>

        {/* Chat list */}
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 84 : 0}
        >
          <View style={styles.flex} className='px-3'>
            <FlatList
              data={messages}
              keyExtractor={(m) => String(m.id)}
              inverted // newest at bottom visually
              renderItem={({ item }) => (
                <View
                  className={`my-1 ${/* simple bubble alignment */ ''}`}
                  style={{ alignItems: 'flex-start' }}
                >
                  <View className='max-w-[85%] rounded-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-800'>
                    <View className='flex-row items-center gap-1 mb-0.5'>
                      <IconSymbol name='person.fill' size={10} color={subtle} />
                      <Text className='text-xs font-medium text-neutral-500 dark:text-neutral-400'>
                        {item.username}
                      </Text>
                      <Text className='text-[10px] text-neutral-400 ml-1'>
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    <Text className='text-[15px] text-neutral-900 dark:text-neutral-100'>
                      {item.text}
                    </Text>
                  </View>
                </View>
              )}
              ListEmptyComponent={
                <View className='py-6 items-center'>
                  <Text className='text-neutral-500 dark:text-neutral-400'>
                    No messages yet. Say hi!
                  </Text>
                </View>
              }
            />
          </View>

          {/* Composer */}
          <View className='border-t border-neutral-200 dark:border-neutral-800 px-3 py-2 bg-white dark:bg-black'>
            <View className='flex-row items-end gap-2'>
              <TextInput
                value={input}
                onChangeText={setInput}
                placeholder='Type a message…'
                placeholderTextColor={subtle}
                multiline
                className='flex-1 min-h-[42px] max-h-[120px] rounded-2xl px-3 py-2 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100'
              />
              <Pressable
                onPress={sendMessage}
                disabled={sending || !input.trim()}
                className={`px-3 py-2 rounded-2xl ${sending || !input.trim() ? 'bg-neutral-300 dark:bg-neutral-800' : 'bg-blue-500'}`}
              >
                <IconSymbol
                  name='paperplane.fill'
                  size={16}
                  color={sending || !input.trim() ? '#A3A3A3' : '#FFFFFF'}
                />
              </Pressable>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
})
