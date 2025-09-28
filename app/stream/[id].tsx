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

type Room = {
	gameId: number
	id: number
	ownerId: number
	title: string
	viewCount: number
}

export default function Stream({ userName }: { userName: string }) {
	const { id } = useLocalSearchParams()
	const [isConnected, setIsConnected] = useState<boolean>(true)
	const [message, setMessage] = useState<string>('')
	const [loading, setLoading] = useState<boolean>(false)
	const [room, setRoom] = useState<Room | null>()
	const [messages, setMessages] = useState<StreamMessageProps[]>([])
	const ws = useRef<WebSocket | null>(null)
	const router = useRouter()

	const fetchRoom = useCallback(async (roomId: number) => {
		setLoading(true)
		const response = await fetch(
			`https://${process.env.EXPO_PUBLIC_SERVER_IP}/room/${roomId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			},
		)
		const data = await response.json()
		setRoom(data.room)
		setLoading(false)
	}, [])

	useEffect(() => {
		fetchRoom(Number(id))

		ws.current = new WebSocket(
			`ws://${process.env.EXPO_PUBLIC_SERVER_IP}/ws/room/${id}`,
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

		return () => {
			ws.current?.close()
		}
	}, [id, fetchRoom])

	const sendMessage = (userName: string, message: string) => {
		if (ws.current && message.trim()) {
			ws.current.send(
				JSON.stringify({
					userName: userName,
					message: message,
					time: Date.now(),
				}),
			)
			setMessages((prev) => [...prev, { userName, message, time: Date.now() }])
			setMessage('')
		}
	}

	if (!isConnected) {
		router.replace('/live')
	}

	if (!room || loading) {
		return (
			<View className='h-screen bg-zinc-950 flex items-center justify-center pt-20'>
				<ActivityIndicator size='large' color={'gold'} />
			</View>
		)
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
				data={messages}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<StreamMessage
						userName={item.userName}
						message={item.message}
						time={item.time} // ✅ pass number
					/>
				)}
				ListFooterComponent={
					<View className='flex flex-row items-center'>
						<TextInput
							className='bg-zinc-900 color-white h-full px-4 flex-grow'
							value={message}
							onChangeText={setMessage}
							placeholder='Type a message...'
						/>
						<Pressable
							className='px-4 bg-yellow-500 h-full flex justify-center'
							onPress={() => sendMessage(userName, message)}
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
		<View className='bg-zinc-900 w-full flex flex-col gap-y-2 mb-4 border-b border-zinc-600 p-4 rounded-lg'>
			<Text className='text-white'>{userName}</Text>
			<Text className='text-white'>{message}</Text>
			<Text className='text-white'>{new Date(time).toLocaleTimeString()}</Text>
		</View>
	)
}
