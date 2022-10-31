import './App.css';
import Home from './views/home/Home';
import { Route, Routes } from 'react-router-dom';
import Detail from './views/detail/Detail';
import Auth from './views/auth/Auth';
import VideoStream from './views/videoStream/VideoStream';
import useOverlayStore from './stores/overlayStore';

function App() {
  const showAuthOverlay = useOverlayStore(state => state.showAuthOverlay);
  
  return (
    <div className="App">
      { showAuthOverlay && <Auth /> }
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:mediaType/:id" element={<Detail />} />
        <Route path="/stream/:mediaType/:id" element={<VideoStream />} />
      </Routes>
    </div>
  );
}

export default App;
