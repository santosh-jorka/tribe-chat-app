import { View, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams } from "expo-router";
import ChatMessage from "../components/ChatMessage";
import type { TMessage, TParticipant } from "../types";
import dummyMessages from "../dummyMessages.json";
import React, { useState } from "react";
import { ScaledSheet } from "react-native-size-matters";
import { useChatStore } from "@/store/useChatStore";
import { useParticipantStore } from "@/store/useParticipantStore";
import { getGroupedReactions } from "@/utils/ChatMessageUtils";
import { TReaction } from "@/types";

const ChatScreen: React.FC = () => {
  const messages: TMessage[] = useChatStore.getState().messages;
  const participants: Record<string, TParticipant> = useParticipantStore.getState().participants;
  const [input, setInput] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
          data={messages}
          keyExtractor={(item) => item.uuid}
          renderItem={({ item, index }) => {
            const currentAuthor = item.authorUuid;
            const previousAuthor =
              index > 0 ? messages[index - 1].authorUuid : null;
            const showHeader = index === 0 || currentAuthor !== previousAuthor;

            return (
              <ChatMessage
                message={item}
                participant={participants[currentAuthor]}
                showHeader={showHeader}
                
              />
            );
          }}
          contentContainerStyle={{ padding: 10 }}
      />
      <View >
        <TextInput
          
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity >
          <Text >Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};



export default ChatScreen;
