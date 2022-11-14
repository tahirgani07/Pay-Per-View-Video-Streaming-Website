import './App.css';
import Home from './views/home/Home';
import { Route, Routes } from 'react-router-dom';
import Detail from './views/detail/Detail';
import Auth from './views/auth/Auth';
import VideoStream from './views/videoStream/VideoStream';
import useOverlayStore from './stores/overlayStore';
import AllMovies from './views/allMovies/AllMovies';
import BillingDashboard from './views/billingDashboard/BillingDashboard';

function App() {
  const showAuthOverlay = useOverlayStore(state => state.showAuthOverlay);
  
  return (
    <div className="App">
      { showAuthOverlay && <Auth /> }
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail/:mediaType/:id" element={<Detail />} />
        <Route path="/stream/:mediaType/:id" element={<VideoStream />} />
        <Route path="/movies/all/:movieType" element={<AllMovies />} />
        <Route path="/billing_dashboard" element={<BillingDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
