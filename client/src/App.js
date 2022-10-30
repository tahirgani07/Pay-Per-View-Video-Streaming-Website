import './App.css';
import Home from './views/home/Home';
import { Route, Routes } from 'react-router-dom';
import Detail from './views/detail/Detail';
import SignIn from './views/signIn/SignIn';

function App() {
  return (
    <div className="App">
      <SignIn />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:mediaType/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
