import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetPage: () => void;
}

const useSearchStore = create<SearchState>((set) => ({
  searchQuery: "",
  setSearchQuery: (query) =>
    set(() => ({
      searchQuery: query,
      currentPage: 1,
    })),

  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  resetPage: () => set({ currentPage: 1 }),
}));

export default useSearchStore;
