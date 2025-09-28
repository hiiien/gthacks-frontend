import { useLocalSearchParams } from 'expo-router'
import { useEffect, useRef, useState } from 'react'
import { FlatList, TextInput, View, Text, Pressable } from 'react-native'

type message = {
	userId: number
	userName: string
	type: string
	timeStamp: string
	message?: string
	bet?: bet
}

type bet = {
	id: number
	title: string,
	betLine: number,
	startTime: string,
}

export default function Stream({ userId, userName }: { userId: number, userName: string }) {
	const { id } = useLocalSearchParams()
	const [isConnected, setIsConnected] = useState<boolean>(false)
	const [message, setMessage] = useState<string>("")
	const [messages, setMessages] = useState<StreamMessageProps[]>([])
	const [bet, setBet] = useState<message | null>(null)
	const ws = useRef<WebSocket | null>(null)


	useEffect(() => {
		ws.current = new WebSocket(`ws://${process.env.EXPO_PUBLIC_SERVER_IP}/ws/room/${id}`)

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
	}, [id])

	const sendMessage = (outMessage: message) => {
		if (ws.current && message.trim()) {
			ws.current.send(
				JSON.stringify(outMessage)
			)
			if (outMessage.type === "message") {
				setMessages((prev) => [...prev, { userName, message, time: Date.now() }])
				setMessage("")
			}
		}
	}
	return (
		<>
			<View className="bg-zinc-900 rounded-lg p-6 w-full flex flex-col gap-y-4 mb-4">
			</View>

			<Text style={{ color: "white" }}>
				{isConnected ? "Connected to WebSocket" : "Not connected to WebSocket"}
			</Text>
			<TextInput
				className='text-white'
				style={{
					borderWidth: 1,
					borderColor: "#ccc",
					padding: 10,
					marginBottom: 10,
				}}
				value={message}
				onChangeText={setMessage}
				placeholder="Type a message..."
			/>
			<FlatList
				data={messages}
				keyExtractor={(_, index) => index.toString()}
				renderItem={({ item }) => (
					<StreamMessage
						userName={item.userName}
						message={item.message}
						time={item.time}
					/>
				)}
			/>
			<Pressable onPress={() => sendMessage({ userId: userId, userName: userName, type: "message", timeStamp: Date.now().toLocaleString(), message })}>
				<Text style={{ color: "white" }}>Send</Text>
			</Pressable>
		</>
	);
}

type StreamMessageProps = {
	userName: string
	message: string
	time: number
}

function StreamMessage({ userName, message, time }: StreamMessageProps) {
	return (
		<View className="bg-zinc-900 w-full flex flex-col gap-y-2 mb-4 border-b border-zinc-600 p-4 rounded-lg">
			<Text className='text-white'>{userName}</Text>
			<Text className='text-white'>{message}</Text>
			<Text className='text-white'>
				{new Date(time).toLocaleTimeString()}
			</Text>
		</View>
	)
}
