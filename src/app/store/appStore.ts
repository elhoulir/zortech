// src/store/appStore.ts
import { create } from 'zustand';

// This defines all the shared states for our application
type AppState = {
    cursorVariant: 'default' | 'link';
    setCursorVariant: (variant: 'default' | 'link') => void;
    activeSection: string;
    setActiveSection: (section: string) => void;
    currentScene: string;
    setCurrentScene: (scene: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
    // State for the custom cursor
    cursorVariant: 'default',
    setCursorVariant: (variant) => set({ cursorVariant: variant }),

    // State for the active navigation section
    activeSection: 'home',
    setActiveSection: (section) => set({ activeSection: section }),

    // State for the current interactive scene
    currentScene: 'intro',
    setCurrentScene: (scene) => set({ currentScene: scene }),
}));