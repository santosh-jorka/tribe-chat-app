import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { TParticipant } from "../types";

interface ParticipantStore {
    participants: Record<string, TParticipant>;
    setParticipants: (participants: TParticipant[]) => void;
    updateParticipant: (updated: TParticipant) => void;
    clearParticipants: () => void;
}

export const useParticipantStore = create<ParticipantStore>()(
    persist(
        (set, get) => ({
            participants: {},
            setParticipants: (participants) => {
                const mapped: Record<string, TParticipant> = {};
                participants.forEach(p => {
                    mapped[p.uuid] = p;
                });
                set({participants: mapped});
            },  
            updateParticipant: (updated) => {
                set({
                    participants: {
                        ...get().participants,
                        [updated.uuid]: updated,
                    },
                });
            },
            clearParticipants: () => set({participants: {}}),
        }),
        {
            name: 'participant-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);