import {View, FlatList, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform} from "react-native";
import ChatMessage from "../components/ChatMessage";
import type {TMessage, TParticipant} from "../types";
import React, {useState, useEffect} from "react";
import {ScaledSheet, scale} from "react-native-size-matters";
import {useChatStore} from "@/store/useChatStore";
import {useParticipantStore} from "@/store/useParticipantStore";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useNavigation} from "expo-router";
import {next} from "sucrase/dist/types/parser/tokenizer";


const ChatScreen: React.FC = () => {
    const navigation = useNavigation();
    useEffect(() => {
        navigation.setOptions({title: 'Group Chat',headerTitleAlign: 'center',});
    }, []);
    const insets = useSafeAreaInsets();
    const messages: TMessage[] = useChatStore.getState().messages?.toArray?.() ?? [];
    const participants: Record<string, TParticipant> = useParticipantStore.getState().participants;
    const oldestMessage = useChatStore.getState().getLastMessage();
    const [input, setInput] = useState("");
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const handleAttachFile = () => {
        // TODO: integrate document picker or image picker here
        console.log("Attach file pressed!");
    };
    const addMessageToChat = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        try {
            const response = await fetch('https://dummy-chat-server.tribechat.com/api/messages/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({text: trimmed}),
            });

            if (!response.ok) {
                throw new Error(`Failed to send message: ${response.status}`);
            }

            const newMessage: TMessage = await response.json();
            console.debug('Message sent:', newMessage);
            useChatStore.getState().addMessage(newMessage);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const loadOlderMessages = async () => {
        if (isLoadingMore || !hasMore || messages.length === 0) return;
        if (!oldestMessage) return;
        setIsLoadingMore(true);

        // Find the oldest message UUID (last in the reversed list)

        console.log(oldestMessage.uuid);
        try {
            const response = await fetch(
                `https://dummy-chat-server.tribechat.com/api/messages/older/${oldestMessage.uuid}`
            );

            if (!response.ok) throw new Error("Failed to fetch older messages");

            const olderMessages: TMessage[] = await response.json();

            if (olderMessages.length === 0) {
                setHasMore(false); // No more messages to load
            } else {
                console.debug("Loaded older messages");
                useChatStore.getState().addOlderMessages(olderMessages.reverse());
            }
        } catch (err) {
            console.error("Error loading older messages", err);
        } finally {
            setIsLoadingMore(false);
        }
    };


    return (
        <View style={[styles.mainContainer]}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.keyboardAvoidingViewflex}
                keyboardVerticalOffset={90}
            >
                <FlatList
                    data={messages}
                    inverted={true}
                    keyExtractor={(item) => item.uuid}
                    onEndReached={loadOlderMessages}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={
                        isLoadingMore ? (
                            <Text style={{textAlign: 'center', padding: 10}}>Loading more...</Text>
                        ) : null
                    }
                    renderItem={({item, index}) => {
                        const currentAuthor = item.authorUuid;
                        const previousAuthor = index > 0 ? messages[index - 1].authorUuid : null;
                        const nextAuthor = index + 1 < messages.length ? messages[index + 1].authorUuid : null;
                        const isSentByYou = currentAuthor === 'you'; // change this check as needed
                        const showHeaderReceiver = !isSentByYou && (index === 0 || currentAuthor !== nextAuthor);
                        const showHeaderSender = isSentByYou && (index === messages.length - 1 || currentAuthor !== previousAuthor);
                        const showHeader = showHeaderReceiver || showHeaderSender;
                        const currentDate = new Date(item.sentAt);
                        const previousDate = index > 0 ? new Date(messages[index - 1].sentAt) : null;
                        const showDate = index === 0 || currentDate.toDateString() !== previousDate?.toDateString();
                        return (
                            <ChatMessage
                                message={item}
                                participant={participants[currentAuthor]}
                                showHeader={showHeader}
                                showDate={showDate}
                                groupedReactions={[]}
                            />
                        );
                    }}
                    contentContainerStyle={styles.flatList}
                />
                <View style={styles.inputContainer}>
                    <TouchableOpacity onPress={handleAttachFile} style={styles.attachButton}>
                        <Text style={styles.attachText}>+</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.textInput}
                        value={input}
                        onChangeText={setInput}
                        placeholder="Type a message..."
                        placeholderTextColor="#888"
                        multiline
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={addMessageToChat}>
                        <Text style={styles.sendText}>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

export default ChatScreen;

const styles = ScaledSheet.create({
    mainContainer: {
        flex: 1,
        //backgroundColor: 'red',
        paddingBottom: scale(10),
        paddingTop: scale(10),
    },
    keyboardAvoidingViewflex: {
        flex: 1,
        //backgroundColor: 'blue',
    },
    flatList: {
        //backgroundColor: 'green',
        paddingTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(8),
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderColor: '#eee',
    },
    attachButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scale(32),
        height: scale(32),
        borderRadius: scale(16),
        backgroundColor: '#e0e0e0',
        marginRight: scale(8),
    },

    attachText: {
        fontSize: scale(18),
        fontWeight: 'bold',
    },
    textInput: {
        flex: 1,
        height: scale(30),
        borderRadius: scale(20),
        backgroundColor: '#f2f2f2',
        paddingHorizontal: scale(14),
        fontSize: scale(14),
        marginRight: scale(8),
    },
    sendButton: {
        backgroundColor: '#007AFF',
        borderRadius: scale(20),
        paddingHorizontal: scale(14),
        paddingVertical: scale(6),
    },
    sendText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: scale(14),
    },
}); 