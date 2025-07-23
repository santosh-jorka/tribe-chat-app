import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Deque from 'denque';

import {TMessage} from '../types';

interface ChatStore {
    messages: Deque<TMessage>;
    firstMessageUuid: string | null;
    lastMessageUuid: string | null;
    setMessages: (messages: TMessage[]) => void;
    addMessage: (message: TMessage) => void;
    addOlderMessages: (olderMessages: TMessage[]) => void;
    updateMessage: (updated: TMessage) => void;
    getFirstMessage: () => TMessage | undefined;
    getLastMessage: () => TMessage | undefined;
    clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            messages: new Deque<TMessage>(),
            firstMessageUuid: null,
            lastMessageUuid: null,

            setMessages: (messages) => {
                const deque = new Deque(messages);
                set({
                    messages: deque,
                    firstMessageUuid: deque.peekFront()?.uuid ?? null,
                    lastMessageUuid: deque.peekBack()?.uuid ?? null,
                });
            },

            addMessage: (message) => {
                const messages = get().messages;
                messages.unshift(message); // Add to front (newest)
                set({
                    messages,
                    firstMessageUuid: messages.peekFront()?.uuid ?? null,
                });
            },

            addOlderMessages: (olderMessages) => {
                const messages = get().messages;
                for (const msg of olderMessages) {
                    messages.push(msg); // Add to back (older)
                }
                set({
                    messages,
                    lastMessageUuid: messages.peekBack()?.uuid ?? null,
                });
            },

            updateMessage: (updated) => {
                const messages = get().messages.toArray().map((m) =>
                    m.uuid === updated.uuid ? updated : m
                );
                const deque = new Deque(messages);
                set({
                    messages: deque,
                    firstMessageUuid: deque.peekFront()?.uuid ?? null,
                    lastMessageUuid: deque.peekBack()?.uuid ?? null,
                });
            },

            getFirstMessage: () => get().messages.peekFront(),
            getLastMessage: () => get().messages.peekBack(),

            clearMessages: () =>
                set({
                    messages: new Deque<TMessage>(),
                    firstMessageUuid: null,
                    lastMessageUuid: null,
                }),
        }),
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => AsyncStorage),

            // Serialize: convert Deque to array
            serialize: (state) => {
                return JSON.stringify({
                    state: {
                        ...state.state,
                        messages: state.state.messages.toArray(),
                    },
                    version: state.version,
                });
            },

            // Deserialize: convert messages array back to Deque
            deserialize: (str) => {
                const parsed = JSON.parse(str);
                const messageArray = parsed.state.messages ?? [];

                const deque = new Deque<TMessage>(messageArray);
                parsed.state.messages = deque;
                parsed.state.firstMessageUuid = deque.peekFront()?.uuid ?? null;
                parsed.state.lastMessageUuid = deque.peekBack()?.uuid ?? null;

                return parsed;
            },
        }
    )
);
