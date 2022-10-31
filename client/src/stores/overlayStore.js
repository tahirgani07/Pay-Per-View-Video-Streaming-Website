import create from 'zustand';

let useOverlayStore = create((set) => ({
    showAuthOverlay: false,
    toggleShowAuthOverlay: () => set((state) => ({ ...state, showAuthOverlay: !state.showAuthOverlay })),
}));

// to store data in loccal storage // - add import { persist } from 'zustand/middleware'
// userStore = persist(store, { user: 'user_settings' });

export default useOverlayStore;