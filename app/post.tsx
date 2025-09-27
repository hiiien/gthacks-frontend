import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import PostModal from "../components/postmodal/PostModal";

export default function PostingScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={openModal}
            style={({ pressed }) => [
              styles.createButton,
              pressed && styles.createButtonPressed
            ]}
          >
            <Text style={styles.buttonText}>
              Create Post
            </Text>
          </Pressable>
        </View>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>
            Let them know your BETS!
          </Text>
        </View>
      </View>

      <PostModal
        visible={modalVisible}
        onClose={closeModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 32,
    backgroundColor: '#f8fafc',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 24,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#2D3748',
    padding: 16,
    borderRadius: 12,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  createButtonPressed: {
    backgroundColor: '#4A5568',
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitleContainer: {
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
