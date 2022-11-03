const TMDB_API_KEY = "3009bec8852b6cc29e106aa02959390b";

const requests = {
    fetchActionMovies: `/movies/action?count=20`,
    fetchComedyMovies: `/movies/comedy?count=20`,
    fetchHorrorMovies: `/movies/horror?count=20`,
    fetchRomanceMovies: `/movies/romance?count=20`,
    fetchDocumentaries: `/movies/documentary?count=20`,
    fetchAnimationMovies: `/movies/animation?count=20`,
    fetchFamilyMovies: `/movies/family?count=20`,
    fetchFantasyMovies: `/movies/fantasy?count=20`,
    fetchScienceFictionMovies: `/movies/science%20fiction?count=20`,
    fetchHistoryMovies: `/movies/history?count=20`,
};

export default requests;