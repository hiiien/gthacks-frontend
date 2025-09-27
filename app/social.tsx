import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export type Post = {
	id: number;
	userName: string;
	title: string;
	text: string;
	over: number;
	under: number;
	hitPercent: number;
	repAmt: number;
};

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
];

export default function Social() {
	const [posts, setPosts] = useState<Post[]>([]);

	useEffect(() => {
		setPosts(testPosts);
	}, []);

	return (
		<FlatList
			data={posts}
			keyExtractor={(item) => item.id.toString()}
			renderItem={({ item }) => <Card {...item} />}
			contentContainerStyle={styles.list}
		/>
	);
}

function Card({ userName, title, text }: Post) {
	return (
		<View className="bg-gray-100 h-100 w-full ml-4 mr-4">
			<View className="bg-gray-100 rounded-lg flex flex-row">
				< ThemedText type="default" className="text-black will-change-variable" >
					{userName}
				</ThemedText >
				<ThemedText type="defaultSemiBold" className="text-black text-lg will-change-variable">
					{title}
				</ThemedText>
			</View>
			<ThemedText type="default" className="text-black will-change-variable">
				{text}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		padding: 16,
	},
});
