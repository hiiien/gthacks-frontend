import { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
	Pressable,
	TextInput,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

export type Post = {
	id: number;
	hot: boolean;
	userName: string;
	title: string;
	text: string;
	over: number;
	under: number;
	hitPercent: number;
	repAmt: number;
};

const games = [
	"Lakers vs Celtics",
	"Chiefs vs 49ers",
	"Real Madrid vs Barcelona",
	"Yankees vs Red Sox",
	"Serena vs Osaka",
	"Messi vs Ronaldo",
	"Novak vs Nadal",
	"Arsenal vs Man City",
];

const comments = [
	"This one’s going to be wild!",
	"No way the under hits here.",
	"Lock of the century 🔒",
	"I’m riding with the over tonight.",
	"Rep line looks too good to be true.",
	"This game will come down to the wire.",
	"Over bettors sweating already 😅",
	"Defense wins championships, I’m taking the under.",
];

function generateFakePosts(page: number, limit: number): Post[] {
	return Array.from({ length: limit }, (_, i) => {
		const id = (page - 1) * limit + i + 1;
		const overPercent = Math.floor(Math.random() * 100);
		const underPercent = 100 - overPercent;

		return {
			id,
			hot: Math.random() > 0.5,
			userName: `User${Math.floor(Math.random() * 1000)}`,
			title: games[Math.floor(Math.random() * games.length)],
			text: comments[Math.floor(Math.random() * comments.length)],
			over: overPercent,
			under: underPercent,
			hitPercent: Math.floor(Math.random() * 100),
			repAmt: Math.floor(Math.random() * 5000),
		};
	});
}

export default function Social() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	// Inputs for new post
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [over, setOver] = useState("");
	const [under, setUnder] = useState("");

	const fetchPosts = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);

		const newPosts = generateFakePosts(page, 10);
		if (newPosts.length < 10) setHasMore(false);

		setPosts((prev) => [...prev, ...newPosts]);
		setPage((prev) => prev + 1);
		setLoading(false);
	}, [page, loading, hasMore]);

	useEffect(() => {
		fetchPosts();
	}, []);

	const handleAddPost = () => {
		if (!title.trim() || !text.trim()) return;

		let overPercent = parseInt(over) || 0;
		if (overPercent > 100) overPercent = 100;
		if (overPercent < 0) overPercent = 0;
		const underPercent = 100 - overPercent;

		const newPost: Post = {
			id: posts.length + 1,
			hot: Math.random() > 0.5,
			userName: "You",
			title,
			text,
			over: overPercent,
			under: underPercent,
			hitPercent: Math.floor(Math.random() * 100),
			repAmt: Math.floor(Math.random() * 5000),
		};

		setPosts([newPost, ...posts]); // add to top
		setTitle("");
		setText("");
		setOver("");
		setUnder("");
	};

	return (
		<View className="h-screen bg-zinc-950 flex flex-col">
			{/* Compose box */}
			<View className="pt-24 pb-6 px-8 border-b border-zinc-800 flex flex-col gap-y-4">
				<Text className="text-3xl font-extrabold text-zinc-100 tracking-wide">
					Make Post
				</Text>

				<TextInput
					value={title}
					onChangeText={setTitle}
					placeholder="Game Title (e.g. Lakers vs Celtics)"
					placeholderTextColor="#9ca3af"
					className="bg-zinc-800 text-white px-3 py-2 rounded-lg"
				/>

				<TextInput
					value={text}
					onChangeText={setText}
					placeholder="Your comment"
					placeholderTextColor="#9ca3af"
					className="bg-zinc-800 text-white px-3 py-2 rounded-lg"
					multiline
				/>

				<View className="flex flex-row gap-x-4">
					<TextInput
						value={over}
						onChangeText={(val) => {
							setOver(val);
							const num = parseInt(val) || 0;
							setUnder((100 - num).toString());
						}}
						placeholder="Over %"
						placeholderTextColor="#9ca3af"
						keyboardType="numeric"
						className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg"
					/>
					<TextInput
						value={under}
						editable={false}
						placeholder="Under %"
						placeholderTextColor="#9ca3af"
						className="flex-1 bg-zinc-800 text-white px-3 py-2 rounded-lg opacity-70"
					/>
				</View>

				<Pressable
					onPress={handleAddPost}
					className="bg-yellow-500 py-2 px-4 rounded-lg self-end"
				>
					<Text className="text-black font-bold">Submit</Text>
				</Pressable>
			</View>

			{/* Feed */}
			<View className="flex-grow bg-zinc-950">
				<FlatList
					data={posts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <Card {...item} />}
					contentContainerStyle={styles.list}
					onEndReached={fetchPosts}
					onEndReachedThreshold={0.5}
					ListFooterComponent={
						loading ? (
							<ActivityIndicator
								size="small"
								color="white"
								style={{ margin: 12 }}
							/>
						) : null
					}
				/>
			</View>
		</View>
	);
}

function Card({ userName, title, text, hot, over, under, repAmt }: Post) {
	return (
		<View className="bg-zinc-900 rounded-lg p-6 w-full flex flex-col gap-y-4 mb-4">
			<View className="flex flex-row items-center justify-between">
				<View className="flex flex-row items-center gap-x-2">
					<View className="w-12 h-12 rounded-full bg-zinc-500" />
					<Text className="text-white font-medium text-lg">@{userName}</Text>
				</View>
				<Text className="text-white font-semibold text-lg tracking-tight">
					{title}
				</Text>
				{hot && (
					<Svg
						width="24"
						height="24"
						viewBox="0 0 24 24"
						fill="none"
						stroke="green"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					>
						<Path d="M16 7h6v6" />
						<Path d="m22 7-8.5 8.5-5-5L2 17" />
					</Svg>
				)}
			</View>
			<Text className="text-zinc-300">{text}</Text>
			<View className="flex flex-row justify-between mt-2">
				<Text className="text-green-400">Over: {over}%</Text>
				<Text className="text-red-400">Under: {under}%</Text>
				<Text className="text-yellow-400">{repAmt} Rep</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		padding: 16,
	},
});
