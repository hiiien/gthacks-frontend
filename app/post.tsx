
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useState } from "react";
import { Alert, TextInput, TouchableOpacity } from "react-native";

export default function PostingScreen() {
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    if (postText.trim()) {
      Alert.alert("Post Created", "Your post has been shared!");
      setPostText("");
    } else {
      Alert.alert("Empty Post", "Please write something before posting.");
    }
  };

  return (
    <ThemedView className="flex-1 p-4">
      <ThemedView className="flex-1 gap-4 ">
        <ThemedText type="subtitle">What's on your mind?</ThemedText>
        
        <TextInput
          className="border border-gray-300 rounded-lg p-4 text-base min-h-[120px] bg-gray-50"
          placeholder="Share your thoughts..."
          placeholderTextColor="#666"
          multiline
          numberOfLines={6}
          value={postText}
          onChangeText={setPostText}
        />
        
        <TouchableOpacity 
          className={`py-3 px-6 rounded-lg items-center mt-4 ${
            postText.trim() ? 'bg-blue-500' : 'bg-gray-400'
          }`}
          onPress={handlePost}
          disabled={!postText.trim()}
        >
          <ThemedText className="text-white text-base font-semibold">Post</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
