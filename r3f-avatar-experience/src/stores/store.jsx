import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useAvatarStore = create(
  subscribeWithSelector((set, get) => ({
    // CHARACTER CONTROLLER
    avatarState: 'Idle',
    setAvatarState: (avatarState) =>
      set({
        avatarState
      })
  }))
);

export const usePhases = create((set) => {
  return {
    phase: 'isReady',

    isStarted: () => set({ phase: 'isStarted' })
  };
});
