import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import '../global.css';

export default function HelpScreen() {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    {
      question: "How do I start streaming?",
      answer: "To start streaming, go to the Live tab and tap the 'Go Live' button. Make sure you have a stable internet connection and your camera/microphone permissions are enabled."
    },
    {
      question: "How can I change my stream quality?",
      answer: "You can adjust your stream quality in Settings > Streaming > Stream Quality. Choose from 720p, 1080p, or 4K depending on your internet connection."
    },
    {
      question: "Why is my stream lagging?",
      answer: "Stream lag can be caused by slow internet connection, high CPU usage, or network congestion. Try lowering your stream quality or checking your internet speed."
    },
    {
      question: "How do I manage my followers?",
      answer: "Go to your Profile tab and tap on 'Followers' to see your follower list. You can block or mute users from there."
    },
    {
      question: "Can I stream from multiple devices?",
      answer: "Yes, you can stream from multiple devices, but only one active stream per account at a time. Make sure to end your current stream before starting a new one."
    }
  ];

  const toggleFAQ = (index: number) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <SafeAreaView className='flex-1 bg-zinc-950'>
      <ScrollView className='flex-1 bg-zinc-950'>
        {/* Header */}
        <View className='px-6 pt-4 pb-6 border-b border-zinc-800'>
          <View className='flex-row items-center justify-between'>
            <Pressable
              onPress={() => router.back()}
              className='bg-zinc-800 px-4 py-2 rounded-lg'
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#27272a' : '#27272a',
                  transform: [{ scale: pressed ? 0.95 : 1 }]
                }
              ]}
            >
              <Text className='text-white font-medium'>← Back</Text>
            </Pressable>
            <Text className='text-white text-xl font-bold'>Help & Support</Text>
            <View className='w-16'></View>
          </View>
        </View>

        <View className='px-6 pt-6'>
          {/* Quick Actions */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Quick Actions</Text>
            <View className='flex-row space-x-3'>
              <Pressable
                className='flex-1 bg-blue-600 py-4 rounded-md items-center mr-2'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#2563eb' : '#2563eb',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className='text-white font-semibold'>📞 Contact Support</Text>
              </Pressable>
              
              <Pressable
                className='flex-1 bg-zinc-700 py-4 rounded-md items-center'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className='text-white font-semibold'>💬 Live Chat</Text>
              </Pressable>
            </View>
          </View>

          {/* Help Categories */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Help Categories</Text>
            <View className='space-y-3 mb-2'>
              <Pressable
                className='bg-zinc-900 rounded-xl p-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : '#18181b',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row items-center'>
                  <View className='w-12 h-12 bg-blue-600/20 rounded-full items-center justify-center mr-4'>
                    <Text className='text-blue-400 text-xl'>📺</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white font-semibold'>Getting Started</Text>
                    <Text className='text-zinc-400 text-sm'>Learn the basics of streaming</Text>
                  </View>
                  <Text className='text-zinc-400 text-xl'>›</Text>
                </View>
              </Pressable>

              <Pressable
                className='bg-zinc-900 rounded-lg p-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : '#18181b',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row items-center'>
                  <View className='w-12 h-12 bg-green-600/20 rounded-full items-center justify-center mr-4'>
                    <Text className='text-green-400 text-xl'>⚙️</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white font-semibold'>Technical Issues</Text>
                    <Text className='text-zinc-400 text-sm'>Troubleshoot streaming problems</Text>
                  </View>
                  <Text className='text-zinc-400 text-xl'>›</Text>
                </View>
              </Pressable>

              <Pressable
                className='bg-zinc-900 rounded-lg p-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : '#18181b',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row items-center'>
                  <View className='w-12 h-12 bg-purple-600/20 rounded-full items-center justify-center mr-4'>
                    <Text className='text-purple-400 text-xl'>👥</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white font-semibold'>Account & Profile</Text>
                    <Text className='text-zinc-400 text-sm'>Manage your account settings</Text>
                  </View>
                  <Text className='text-zinc-400 text-xl'>›</Text>
                </View>
              </Pressable>

              <Pressable
                className='bg-zinc-900 rounded-lg p-4'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#27272a' : '#18181b',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <View className='flex-row items-center'>
                  <View className='w-12 h-12 bg-orange-600/20 rounded-full items-center justify-center mr-4'>
                    <Text className='text-orange-400 text-xl'>💰</Text>
                  </View>
                  <View className='flex-1'>
                    <Text className='text-white font-semibold'>Monetization</Text>
                    <Text className='text-zinc-400 text-sm'>Learn about earning money</Text>
                  </View>
                  <Text className='text-zinc-400 text-xl'>›</Text>
                </View>
              </Pressable>
            </View>
          </View>

          {/* FAQ Section */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Frequently Asked Questions</Text>
            <View className='space-y-3'>
              {faqs.map((faq, index) => (
                <View key={index} className='bg-zinc-900 rounded-lg overflow-hidden mt-2'>
                  <Pressable
                    onPress={() => toggleFAQ(index)}
                    className='px-4 py-4'
                    style={({ pressed }) => [
                      {
                        backgroundColor: pressed ? '#27272a' : 'transparent',
                        transform: [{ scale: pressed ? 0.98 : 1 }]
                      }
                    ]}
                  >
                    <View className='flex-row justify-between items-center'>
                      <Text className='text-white font-medium flex-1 pr-4'>{faq.question}</Text>
                      <Text className={`text-zinc-400 text-xl transition-transform ${expandedFAQ === index ? 'rotate-90' : ''}`}>
                        ›
                      </Text>
                    </View>
                  </Pressable>
                  
                  {expandedFAQ === index && (
                    <View className='px-4 pb-4 border-t border-zinc-800'>
                      <Text className='text-zinc-300 text-sm leading-6 pt-4'>{faq.answer}</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Contact Information */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Contact Information</Text>
            <View className='bg-zinc-900 rounded-lg p-4'>
              <View className='space-y-4'>
                <View className='flex-row items-center'>
                  <Text className='text-zinc-400 w-20'>Email:</Text>
                  <Text className='text-white'>support@streamapp.com</Text>
                </View>
                <View className='flex-row items-center'>
                  <Text className='text-zinc-400 w-20'>Phone:</Text>
                  <Text className='text-white'>+1 (555) 123-4567</Text>
                </View>
                <View className='flex-row items-center'>
                  <Text className='text-zinc-400 w-20'>Hours:</Text>
                  <Text className='text-white'>24/7 Support</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Community Links */}
          <View className='mb-8'>
            <Text className='text-white text-lg font-semibold mb-4'>Community</Text>
            <View className='flex-row space-x-3'>
              <Pressable
                className='flex-1 bg-zinc-700 py-3 rounded-md items-center mr-2'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className='text-white font-medium'>Discord</Text>
              </Pressable>
              
              <Pressable
                className='flex-1 bg-zinc-700 py-3 rounded-md items-center mr-2'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className='text-white font-medium'>Reddit</Text>
              </Pressable>
              
              <Pressable
                className='flex-1 bg-zinc-700 py-3 rounded-md items-center mr-2'
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? '#3f3f46' : '#3f3f46',
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                  }
                ]}
              >
                <Text className='text-white font-medium'>Twitter</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
