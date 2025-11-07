import { create } from "zustand";

interface AppState {
  theme: "light" | "dark";
  selectedFilter: string | null;
  cameraOpen: boolean;
  setTheme: (theme: "light" | "dark") => void;
  setSelectedFilter: (filter: string | null) => void;
  setCameraOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  theme: "light",
  selectedFilter: null,
  cameraOpen: false,
  setTheme: (theme) => set({ theme }),
  setSelectedFilter: (filter) => set({ selectedFilter: filter }),
  setCameraOpen: (open) => set({ cameraOpen: open }),
}));

