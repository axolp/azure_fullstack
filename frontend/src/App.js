import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {useState} from 'react'
import logo from './logo.svg';
import './App.css';

import DisplayCharacter from './pages/DisplayCharacters';
import RegistrationForm from './pages/Registration';
import Logowanie from './pages/Logowanie';
import Home from './pages/Home';
import Episode1 from './pages/Episode1';
import Episode2 from './pages/Episode2';
import Flashcards from './pages/Flashcards';
import Menu from './components/menu';
import Info from './pages/Info';
import ChartPage from './pages/ChartPage'
import Sidebar from './components/sb_menu';
import { LuMenuSquare } from "react-icons/lu";
import { Link } from 'react-router-dom';

function App() {


  return (
    <Router>
      
      <div>
      <nav>
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/flashcards">Flashcards</Link></li>
        <li><Link to="/info">About</Link></li>
        
      </ul>
    </nav>
      

       
       
      
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Logowanie />} />
          <Route path="/home" element={<Home />} />
          <Route path="smartbear/groupChart" element={<ChartPage />} />
            <Route path="/home/episode1" element={<Episode1/>}></Route>
            <Route path="/home/episode2" element={<Episode2/>}></Route>
            <Route path="/flashcards" element={<Flashcards/>}/>
            <Route path="/info" element={<Info/>}/>
        </Routes>
      </div>
  </Router>
  );
}

export default App;
