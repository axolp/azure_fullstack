import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import DisplayCharacter from './pages/DisplayCharacters';
import RegistrationForm from './pages/Registration';
import Logowanie from './pages/Logowanie';
import Home from './pages/Home';
import Episode1 from './pages/Episode1';
import Flashcards from './pages/Flashcards';
import Menu from './components/menu';
import Info from './pages/Info';

function App() {
  return (
    <Router>
      <div>
        <Menu/>
      
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Logowanie />} />
          <Route path="/home" element={<Home />} />
            <Route path="/home/episode1" element={<Episode1/>}></Route>
            <Route path="/flashcards" element={<Flashcards/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
