import { useCallback, useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	StyleSheet,
	Text,
	View,
	Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

export default function Social() {
	const [posts, setPosts] = useState<Post[]>([]);
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);

	const fetchPosts = useCallback(async () => {
		if (loading || !hasMore) return;
		setLoading(true);
		try {
			const res = await fetch(
				`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
			);
			const data: any[] = await res.json();

			if (data.length < 10) setHasMore(false);

			const mapped: Post[] = data.map((d) => ({
				id: d.id,
				hot: d.userId % 2 === 0,
				userName: `User${d.userId}`,
				title: d.title,
				text: d.body,
				over: Math.floor(Math.random() * 500),
				under: Math.floor(Math.random() * 500),
				hitPercent: Math.floor(Math.random() * 100),
				repAmt: Math.floor(Math.random() * 100),
			}));

			setPosts((prev) => [...prev, ...mapped]);
			setPage((prev) => prev + 1);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false);
		}
	}, [page, loading, hasMore]);

	useEffect(() => {
		fetchPosts();
	}, []);

	return (
		<>
			<View className='h-screen bg-zinc-950 flex flex-col'>
				<Pressable className='pt-24 pb-8 px-8 border-b-[1px] border-zinc-800 flex flex-row items-center gap-x-4'>
					<Text className='text-4xl font-extrabold text-zinc-100 tracking-wide'>
						Make Post
					</Text>
				</Pressable>
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
								<ActivityIndicator size="small" color="white" style={{ margin: 12 }} />
							) : null
						}
					/>
				</View>
			</View>
		</>
	);
}

function Card({ userName, title, text, hot }: Post) {
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
						className="lucide lucide-trending-up-icon lucide-trending-up"
					>
						<Path d="M16 7h6v6" />
						<Path d="m22 7-8.5 8.5-5-5L2 17" />
					</Svg>
				)}
			</View>
			<Text className="text-zinc-300">{text}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		padding: 16,
	},
});
