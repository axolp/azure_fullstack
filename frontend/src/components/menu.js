import React from 'react';
import { Link } from 'react-router-dom'; // Załóżmy, że używasz react-router-dom dla nawigacji
import '../menu.css';
const Menu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/home"><img src='logowisecut.PNG'   alt="logo" style= {{width:128+'px', height:128+'px'}}></img> </Link></li>
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/register">Rejestracja</Link></li>
                <li><Link to="/login">Logowanie</Link></li>
                <li><Link to="/flashcards">Flashcards</Link></li>
                <li><Link to="/info">Info</Link></li>
            </ul>
        </nav>
    );
};

export default Menu;