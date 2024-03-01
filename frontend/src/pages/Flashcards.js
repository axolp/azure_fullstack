import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';




function Flashcards() {
    
    const [fiszki, setFiszki]= useState([]);
    const [backIndex, setBackIndex]= useState(0);
    const [currentIndex, setCurrentIndex]= useState(0);
    const [fiszkiLength, setFiszkiLength]= useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        console.log("wysiwetlam user id: ");
        console.log(sessionStorage['user_id']);

      <script src="https://www.youtube.com/iframe_api"></script>
        window.onYouTubeIframeAPIReady = (yt_id) => {
            videoRef.current = new window.YT.Player('player', {
                height: '540',
                width: '960',
                videoId: 'n8J0t7oKHTQ', // Twoje ID wideo
                playerVars: {
                    //autoplay: 1,
                    start: 1121,
                    //mute: 1,
                     // Włącza autoodtwarzanie
                    // Możesz dodać więcej zmiennych odtwarzacza tutaj, jeśli potrzebujesz
                },
               
            });
        };

        // Inicjalizacja YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

       
    }, []);

    const nextFlashcard= () => {
        setCurrentIndex(prevcurrentIndex => prevcurrentIndex +1);
        setBackIndex(0);
        console.log(currentIndex);
    }

    const handleBack= () => {
        setBackIndex(prevbackIndex => prevbackIndex +1);
        videoRef.current.playVideo();
        //console.log("sekunda dla fiszki: ", fiszki[currentIndex]['second_in_video']);
        videoRef.current.seekTo(fiszki[currentIndex]['second_in_video'], true);
        let playTime= fiszki[currentIndex]['duration_time_in_video'] - fiszki[currentIndex]['second_in_video']
        console.log("palytime: ", playTime);
        setTimeout(() => {
            if (videoRef.current) { // Sprawdza, czy odtwarzacz wideo istnieje
                videoRef.current.pauseVideo();
            }
        }, playTime * 1000); // Przekształca sekundy na milisekundy
    };
        //console.log("fiszki: ", fiszki);
    

    const getFlashcards= async (e) => {

        const user_id= {
            user_id: sessionStorage['user_id'],
        }

        let response= await fetch('chn-apex-backend.azurewebsites.net/api/getflashcards/',{
                method: 'POST', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(user_id) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });
          
            let data= await response.json()
            //console.log("data", data.length);
            //console.log("fiszki 0: ", data['0']);
            setFiszki(data);
            //console.log(response.ok)
            //setCurrentFiszka(data[nFiszka])

    }

    const anki= async (e) => {

        const user_id= {
            user_id: sessionStorage['user_id'],
        }

        let response= await fetch('http://127.0.0.1:8000/api/getflashcards/',{
                method: 'POST', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(user_id) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });
          
            let data= await response.json()
           
    }


    useEffect(()=>{
        getFlashcards()
    }, []);

    return (
        <>
            <div>
            <div id="player"></div>
                <h1>Fiszki page</h1>
                
                {fiszki !== null && fiszki[currentIndex] &&(fiszki[currentIndex]['character'])}
                <button onClick={nextFlashcard}>Kliknij aby przjesc do nastepnej fiszki</button>
                <button onClick={handleBack}>Kliknij zobaczyc back</button>
                
                {backIndex !== 0 && fiszki != null && fiszki[currentIndex] && (
                    <div>
                     
                        <h1>
                            <div id= 'flashcardContent'>
                            Character{fiszki[currentIndex]['character']}
                            Definicja: {fiszki[currentIndex]['definition']}<br></br>
                           Pin Yin:  {fiszki[currentIndex]['pin_yin']}<br></br>
                            Zdanie: {fiszki[currentIndex]['sentence']}
                            </div>
                        </h1>
                    </div>
                )}
                <h1>How difficult is the flashcard?</h1>
                <button>0</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
            </div>
        </>
    );
};
                                    
    

export default Flashcards;
