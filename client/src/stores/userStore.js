import create from 'zustand';

let userStore = create((set) => ({
    user: null,
    setUser: (user) => set((state) => ({ user: user })),
}));

// to store data in loccal storage // - add import { persist } from 'zustand/middleware'
// userStore = persist(store, { user: 'user_settings' });

export default userStore;