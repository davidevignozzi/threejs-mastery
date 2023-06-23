import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export const useAvatarStore = create(
  subscribeWithSelector((set, get) => ({
    // CHARACTER CONTROLLER
    avatarState: 'standing',
    setAvatarState: (avatarState) =>
      set({
        avatarState
      })
  }))
);
