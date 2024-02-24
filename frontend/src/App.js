import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import DisplayCharacter from './pages/DisplayCharacters';
import RegistrationForm from './pages/Registration';
import Logowanie from './pages/Logowanie';
import Home from './pages/Home';
import Episode1 from './pages/Episode1';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Logowanie />} />
          <Route path="/home" element={<Home />} />
            <Route path="/home/episode1" element={<Episode1/>}></Route>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
