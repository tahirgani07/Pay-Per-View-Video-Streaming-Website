import create from 'zustand';

let searchMoviesStore = create((set) => ({
    searchMovies: [],
    searchMode: false,
    searching: false,
    setSearchMode: (val) => set(state => ({ searchMode: val })),
    setSearching: (val) => set(state => ({ searching: val })),
    setSearchMovies: (searchMovies) => set((state) => ({ searchMovies })),
}));

export default searchMoviesStore;