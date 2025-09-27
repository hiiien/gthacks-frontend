import { View, Text, Alert, Pressable } from 'react-native'

export default function ProfileScreen() {
  return (
    <View className='h-screen bg-zinc-900 flex flex-col'>
      <View className='px-8 pt-20 pb-8 gap-y-6'>
        <View className='flex flex-row items-end gap-x-4'>
          <View className='w-24 h-24 rounded-lg bg-zinc-300'></View>
          <Text className='text-zinc-50 text-3xl font-semibold'>@username</Text>
        </View>
        <Text className='text-zinc-300'>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quibusdam
          possimus qui tenetur eum, consequatur in eos veritatis sit, molestias
          non ipsam obcaecati cum animi.
        </Text>
        <View>
          <View className='border-[1px] border-zinc-50 p-6 rounded-md'>
            <Text className='text-zinc-300'>Biggest Win</Text>
          </View>
        </View>
        <Pressable
          onPress={() => Alert.alert('Simple Button pressed')}
          className='bg-zinc-500 w-full py-2 rounded-md flex items-center'
        >
          <Text className='text-zinc-900 font-medium'>Edit Profile</Text>
        </Pressable>
      </View>
      <View className='flex-grow bg-zinc-950 p-8'></View>
    </View>
  )
}
