import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

interface PostModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PostModal({ visible, onClose }: PostModalProps) {
  const [postText, setPostText] = useState("");

  const handlePost = () => {
    if (postText.trim()) {
      Alert.alert("Post Created", "Your post has been shared!");
      setPostText("");
      onClose();
    } else {
      Alert.alert("Empty Post", "Please write something before posting.");
    }
  };

  const closeModal = () => {
    setPostText("");
    onClose();
  };

  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <Pressable 
        style={styles.modalBackdrop}
        onPress={closeModal}
      />
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>
          Create Your Post
        </Text>
        
        <TextInput
          style={styles.textInput}
          placeholder="What's your bet? Share your thoughts..."
          value={postText}
          onChangeText={setPostText}
          multiline
          textAlignVertical="top"
        />
        
        <View style={styles.buttonRow}>
          <Pressable
            onPress={closeModal}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>
              Cancel
            </Text>
          </Pressable>
          
          <Pressable
            onPress={handlePost}
            style={styles.postButton}
          >
            <Text style={styles.postButtonText}>
              Post
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 9999,
    elevation: 9999,
  },
  modalBackdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10000,
    zIndex: 10000,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    fontSize: 16,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E5E7EB',
    paddingVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#374151',
  },
  postButton: {
    flex: 1,
    backgroundColor: '#2563EB',
    paddingVertical: 12,
    borderRadius: 8,
  },
  postButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: 'white',
  },
});
