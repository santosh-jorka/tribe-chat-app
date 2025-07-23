import {create} from "zustand";
import {persist, createJSONStorage} from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {TMessage} from "../types";

interface ChatStore {
    messages: TMessage[];
    setMessages: (messages: TMessage[]) => void;
    addMessage: (message: TMessage) => void;
    updateMessage: (updated: TMessage) => void;
    addOlderMessages: (olderMessages: TMessage[]) => void;
    clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
    persist(
        (set, get) => ({
            messages: [],
            setMessages: (messages) => set({messages}),
            addMessage: (message) => set({messages: [...get().messages, message]}),
            updateMessage: (updated) =>
                set({
                    messages: get().messages.map((m) =>
                        m.uuid === updated.uuid ? updated : m
                    ),
                }),
            addOlderMessages: (olderMessages) =>

                set((state) => ({
                    messages: [...state.messages, ...olderMessages],
                })),
            clearMessages: () => set({messages: []}),
        }),
        {
            name: 'chat-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);