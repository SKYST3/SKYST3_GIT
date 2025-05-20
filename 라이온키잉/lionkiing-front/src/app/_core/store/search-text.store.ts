import { create } from 'zustand';

interface SearchTextState {
  searchText: string;
  setSearchText: (text: string) => void;
}

export const useSearchTextStore = create<SearchTextState>(set => ({
  searchText: '',
  setSearchText: (text: string) => set({ searchText: text }),
}));
