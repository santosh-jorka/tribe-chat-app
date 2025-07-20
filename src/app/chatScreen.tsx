import { View, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ChatMessage from "../components/ChatMessage";
import type { ChatMessageProps } from "../types";
import dummyMessages from "../dummyMessages.json";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";

interface ChatScreenProps {
  messages?: ChatMessageProps[];
}

const ChatScreen: React.FC<ChatScreenProps> = ({ messages }) => {
  const { chatId, name } = useLocalSearchParams();
  const [input, setInput] = useState("");

  const baseMessages: ChatMessageProps[] = messages ?? (dummyMessages.messages as ChatMessageProps[]);
  
  // Print baseMessages to console for debugging
  /*console.log('baseMessages:', baseMessages);
  console.log('baseMessages length:', baseMessages?.length);
  console.log('dummyMessages:', dummyMessages);*/

  const messagesWithAvatar = baseMessages.map((msg, idx, arr) => {
    if (idx === 0) return { ...msg, showAvatar: true };
    const prev = arr[idx - 1];
    const showAvatar = msg.name !== prev.name || msg.isCurrentUser !== prev.isCurrentUser;
    return { ...msg, showAvatar };
  });

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        data={messagesWithAvatar}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <ChatMessage {...item} />}
        contentContainerStyle={styles.flatListContent}
      />
      <View style={styles.inputBar}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },
  flatListContent: {
    paddingVertical: '16@s',
    paddingHorizontal: '8@s',
    paddingBottom: '70@s',
  },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: '8@s',
    backgroundColor: '#fff',
    borderTopWidth: '1@s',
    borderColor: '#eee',
    position: 'absolute',
    left: '0@s',
    right: '0@s',
    bottom: '0@s',
  },
  input: {
    flex: 1,
    height: '40@s',
    borderRadius: '20@s',
    backgroundColor: '#f2f2f2',
    paddingHorizontal: '16@s',
    fontSize: '16@s',
    marginRight: '8@s',
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: '20@s',
    paddingHorizontal: '16@s',
    paddingVertical: '8@s',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16@s',
  },
});

export default ChatScreen;
