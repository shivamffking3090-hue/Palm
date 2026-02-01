import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useUserStore = create(
  persist(
    (set) => ({
      // State
      hasOnboarded: false,
      language: 'en',
      profile: {
        name: '',
        dob: '',
        timeOfBirth: '',
        gender: '',
        zodiacSign: null,
      },
      
      // Actions
      setLanguage: (lang) => set({ language: lang }),
      
      completeOnboarding: () => set({ hasOnboarded: true }),
      
      setProfile: (data) => set((state) => ({
        profile: { ...state.profile, ...data }
      })),
      
      resetData: () => set({
        hasOnboarded: false,
        profile: {
          name: '',
          dob: '',
          timeOfBirth: '',
          gender: '',
          zodiacSign: null,
        }
      }),
    }),
    {
      name: 'ai-palm-user-storage', // key in localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
