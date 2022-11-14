const TMDB_API_KEY = "3009bec8852b6cc29e106aa02959390b";

const requests = {
    fetchActionMovies: `/movies/genres/action?count=1000`,
    fetchComedyMovies: `/movies/genres/comedy?count=1000`,
    fetchHorrorMovies: `/movies/genres/horror?count=1000`,
    fetchRomanceMovies: `/movies/genres/romance?count=1000`,
    fetchDocumentaries: `/movies/genres/documentary?count=1000`,
    fetchAnimationMovies: `/movies/genres/animation?count=1000`,
    fetchFamilyMovies: `/movies/genres/family?count=1000`,
    fetchFantasyMovies: `/movies/genres/fantasy?count=1000`,
    fetchScienceFictionMovies: `/movies/genres/science%1000fiction?count=1000`,
    fetchHistoryMovies: `/movies/genres/history?count=1000`,
    fetchTrendingMovies: `/movies/trending`,
    fetchWatchlistedMovies: `/watchlist`,
    addToWatchlist: `/watchlist/add`,
};

export default requests;