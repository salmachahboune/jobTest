import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as DocumentPicker from 'expo-document-picker';
import { Audio } from 'expo-av'; // Correct import for Audio
import { useRouter, useLocalSearchParams } from 'expo-router';

const messages = [
  {
    id: '1',
    message:
      "Hello Sarah, thank you for the opportunity! I'm thrilled to hear that you liked my portfolio. I'm available for a virtual interview this Thursday or Friday afternoon. Would either of those times work for you?",
    isUser: true,
  },
  {
    id: '2',
    message:
      'Friday afternoon works perfectly. Let’s schedule the interview for 2 PM. I’ll send you a calendar invite with all the details. Also, do you have any specific accessibility needs for the interview?',
    isUser: false,
  },
  {
    id: '3',
    message:
      'Thank you, Sarah. I prefer having longer pauses to process and respond to questions. That would help me feel more comfortable during the interview.',
    isUser: true,
  },
  {
    id: '4',
    message:
      'Thank you, Sarah. I prefer having longer pauses to process and respond to questions. That would help me feel more comfortable during the interview.',
    isUser: false,
  },
];

export default function ChatScreen() {
  const router = useRouter();
  const { name, image } = useLocalSearchParams();
  const [inputMessage, setInputMessage] = useState('');
  const [recording, setRecording] = useState(null);
  const [pickedFile, setPickedFile] = useState(null);

  // Function to pick any type of file
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*', // Allow all file types
      copyToCacheDirectory: true,
    });
    if (result.type !== 'cancel') {
      setPickedFile(result.uri);
    }
  };

  // Function to start/stop audio recording
  const toggleRecording = async () => {
    if (recording) {
      setRecording(null);
      try {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        console.log('Recording saved at: ', uri);
      } catch (error) {
        console.error('Error stopping recording: ', error);
      }
    } else {
      const { status } = await Audio.requestPermissionsAsync();
      if (status === 'granted') {
        const newRecording = new Audio.Recording();
        try {
          await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
          await newRecording.startAsync();
          setRecording(newRecording);
        } catch (error) {
          console.error('Error during recording: ', error);
        }
      } else {
        console.log('Permission to access microphone denied');
      }
    }
  };

  const renderMessage = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.isUser ? styles.userMessage : styles.otherMessage,
      ]}
    >
      {!item.isUser && (
        <Image
          source={require('./profilepic.png')}
          style={[styles.avatar]}
        />
      )}
      <View
        style={[
          styles.messageBubble,
          item.isUser ? styles.userBubble : styles.otherBubble,
        ]}
      >
        <Text style={[styles.messageText, item.isUser ? styles.userText : styles.otherText]}>
          {item.message}
        </Text>
      </View>
      {item.isUser && (
        <Image
          source={image}
          style={styles.avatar}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="arrow-back"
          size={30}
          color="#fff"
          onPress={() => router.back()}
        />
        <Text style={styles.headerTitle}>{name}</Text>
      </View>
      <View style={styles.body}>
        <FlatList
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={{ paddingVertical: 16 }}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={pickFile}>
            <Ionicons name="attach-outline" size={24} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleRecording}>
            <Ionicons name={recording ? "mic-off-outline" : "mic-outline"} size={24} color="#007AFF" />
          </TouchableOpacity>

          <TextInput
            placeholder="Message"
            style={styles.input}
            value={inputMessage}
            onChangeText={setInputMessage}
          />

          <TouchableOpacity>
            <Ionicons name="send-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {pickedFile && (
          <View style={styles.filePreviewContainer}>
            <Text style={styles.filePreview}>{pickedFile.split('/').pop()}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: -20,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#0C357A',
    height: 130,
    marginBottom: -23,
    borderBottomWidth: 2,
  },
  headerTitle: {
    fontSize: 22,
    color: '#fff',
    marginLeft: 16,
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 14,
    borderRadius: 20,
    borderWidth: 1,
  },
  userBubble: {
    backgroundColor: '#0084FF',
    borderBottomRightRadius: 0,
    marginLeft: 8,
    borderColor: '#0084FF',
  },
  otherBubble: {
    backgroundColor: '#F7F7F7',
    borderBottomLeftRadius: 0,
    marginRight: 8,
    borderColor: '#e0e0e0',
  },
  userMessage: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: '#FFF',
  },
  otherText: {
    color: '#333',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 22.5,
    borderWidth: 2,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: '#e0e0e0',
    backgroundColor: '#F7F7F7',
    marginHorizontal: 8,
  },
  filePreviewContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  filePreview: {
    fontSize: 14,
    color: '#007AFF',
  },
});
