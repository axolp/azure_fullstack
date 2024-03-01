import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//zmienilem na cudzyslowy
function Logowanie() {
    const navigate = useNavigate();
    const [message, setMessage]= useState(null);
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const newFormData = {
            username: e.target.username.value,
            password: e.target.password.value,
        };

        let response= await fetch('https://chn-apex-backend.azurewebsites.net/api/logowanie/',{
                method: 'POST', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(newFormData) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });

            let data= await response.json()
            const user_id= data['user_id'];
            console.log(data['user_id']);
            console.log(response.ok);

            if(! response.ok){
                setMessage(data.message);
                console.log(data.message);
            }
            else{
                //tutaj chce dodac tworzenie sesji dla zalgoowanego uzytkownika
                console.log(newFormData)
                sessionStorage.setItem('user_id', user_id);
                console.log(sessionStorage)
                navigate('/home')
            }

            

       
        
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Nazwa użytkownika:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                />
            </div>
            <div>
                <label htmlFor="password">Hasło:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                />
            </div>
            <button type="submit">Logowanie</button>
            {message}
        </form>
    );
    
}

export default Logowanie;
