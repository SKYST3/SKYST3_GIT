import { create } from 'zustand';

interface GameState {
  isPlaying: boolean;
  currentTime: number;
  gameStarted: boolean;
  startTime: number | null;
  setIsPlaying: (v: boolean) => void;
  setCurrentTime: (t: number) => void;
  setStartTime: (t: number) => void;
  startGame: (startTime: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  gameStarted: false,
  startTime: null,
  setIsPlaying: (v) => set({ isPlaying: v }),
  setCurrentTime: (t) => set({ currentTime: t }),
  setStartTime: (t) => set({ startTime: t }),
  startGame: (startTime) => set({ gameStarted: true, isPlaying: true, currentTime: 0, startTime }),
  resetGame: () =>
    set({
      gameStarted: false,
      isPlaying: false,
      currentTime: 0,
      startTime: null,
    }),
}));
