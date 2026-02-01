import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useHistoryStore = create(
  persist(
    (set, get) => ({
      // State
      chatHistory: [],
      palmReadings: [],
      tarotReadings: [],
      lastDailyGuidance: null, // Stores { date: 'YYYY-MM-DD', content: {} }
      
      // Actions
      addChatMessage: (message) => set((state) => ({
        chatHistory: [...state.chatHistory, message]
      })),

      clearChat: () => set({ chatHistory: [] }),

      savePalmReading: (reading) => set((state) => ({
        palmReadings: [
          { id: Date.now(), date: new Date().toISOString(), ...reading },
          ...state.palmReadings
        ]
      })),

      saveTarotReading: (reading) => set((state) => ({
        tarotReadings: [
          { id: Date.now(), date: new Date().toISOString(), ...reading },
          ...state.tarotReadings
        ]
      })),

      // Daily Guidance logic: prevent fetching multiple times a day
      setDailyGuidance: (content) => set({
        lastDailyGuidance: {
          date: new Date().toDateString(),
          content
        }
      }),

      getDailyGuidance: () => {
        const { lastDailyGuidance } = get();
        const today = new Date().toDateString();
        
        if (lastDailyGuidance && lastDailyGuidance.date === today) {
          return lastDailyGuidance.content;
        }
        return null;
      },

      clearHistory: () => set({
        chatHistory: [],
        palmReadings: [],
        tarotReadings: [],
        lastDailyGuidance: null
      }),
    }),
    {
      name: 'ai-palm-history-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
