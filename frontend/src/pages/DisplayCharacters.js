import React, {useState, useEffect} from 'react'

const DisplayCharacter= ()=>{

let [characters, setCharacters]= useState(null);

let getCharacters = async() =>{
    let response= await fetch('http://127.0.0.1:8000/api/')
    let data= response.json()
    setCharacters(data);
    console.log(data);
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