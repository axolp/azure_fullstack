import React, {useState, useEffect} from 'react'

const DisplayCharacter= ()=>{

let [characters, setCharacters]= useState(null);

let getCharacters = async() =>{
    let response= await fetch('https://chn-apex-backend.azurewebsites.net/api/')
    let data= response.json()
    setCharacters(data);
    console.log(data);
    //console.log(import.meta.env.MODE);
}

useEffect(()=>{

    getCharacters();


}, [])


    return(

        <div>
            <h1>CHARACTERS</h1>
        
        </div>
    )
}

export default DisplayCharacter