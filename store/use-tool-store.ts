import { create } from "zustand"
import { persist } from "zustand/middleware"

interface ToolStore {
  favorites: string[]
  searchQuery: string
  theme: "light" | "dark"
  addFavorite: (slug: string) => void
  removeFavorite: (slug: string) => void
  toggleFavorite: (slug: string) => void
  setSearchQuery: (query: string) => void
  toggleTheme: () => void
}

export const useToolStore = create<ToolStore>()(
  persist(
    (set) => ({
      favorites: [],
      searchQuery: "",
      theme: "dark",
      addFavorite: (slug) =>
        set((state) => ({
          favorites: [...state.favorites, slug],
        })),
      removeFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.filter((f) => f !== slug),
        })),
      toggleFavorite: (slug) =>
        set((state) => ({
          favorites: state.favorites.includes(slug)
            ? state.favorites.filter((f) => f !== slug)
            : [...state.favorites, slug],
        })),
      setSearchQuery: (query) => set({ searchQuery: query }),
      toggleTheme: () =>
        set((state) => ({
          theme: state.theme === "dark" ? "light" : "dark",
        })),
    }),
    {
      name: "smarttools-storage",
    },
  ),
)
