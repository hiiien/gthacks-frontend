import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'
import 'react-native-reanimated'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
});

export default function RootLayout() {
	return (
		<QueryClientProvider client={queryClient}>
			<NativeTabs>
				<NativeTabs.Trigger name='index'>
					<Label>Home</Label>
					<Icon sf='house.fill' drawable='custom_android_drawable' />
				</NativeTabs.Trigger>
				<NativeTabs.Trigger name='explore'>
					<Label>Explore</Label>
					<Icon sf='magnifyingglass' drawable='custom_android_drawable' />
				</NativeTabs.Trigger>
					<NativeTabs.Trigger name='live'>
					<Label>Live</Label>
					<Icon sf='circle.circle' selectedColor='red' drawable='custom_android_drawable' />
				</NativeTabs.Trigger>
				<NativeTabs.Trigger name='profile'>
					<Icon sf='gear' drawable='custom_settings_drawable' />
					<Label>Profile</Label>
				</NativeTabs.Trigger>
				<NativeTabs.Trigger name='social'>
					<Icon sf='heart' drawable='custom_heart_drawable' />
					<Label>Social</Label>
				</NativeTabs.Trigger>
			</NativeTabs>
		</QueryClientProvider>
	)
}
