import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs'
import 'react-native-reanimated'

export const unstable_settings = {
	anchor: '(tabs)',
}

export default function RootLayout() {
	return (
		<NativeTabs>
			<NativeTabs.Trigger name='index'>
				<Label>Home</Label>
				<Icon sf='house.fill' drawable='custom_android_drawable' />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='explore'>
				<Label>Explore</Label>
				<Icon sf='magnifyingglass' drawable='custom_android_drawable' />
			</NativeTabs.Trigger>
			<NativeTabs.Trigger name='profile'>
				<Icon sf='gear' drawable='custom_settings_drawable' />
				<Label>Profile</Label>
			</NativeTabs.Trigger>
		</NativeTabs>
	)
}
