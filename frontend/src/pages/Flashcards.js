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

        let response= await fetch('https://chn-apex-backend.azurewebsites.net/api/getflashcards/',{
                method: 'POST', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(user_id) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });
          
            let data= await response.json()
            //console.log("data", data.length);
            //console.log("fiszki 0: ", data['0']);
            console.log("data: ", data);
            setFiszki(data);
            //console.log(response.ok)
            //setCurrentFiszka(data[nFiszka])

    }

    const anki= async (event) => {

        console.log("wcisnalez guzik");
        const userGrade= event.target.innerText;
        console.log(userGrade);
        console.log("fiszka id: ", fiszki[currentIndex]['fiszka_id']);
        let fiszka_id= fiszki[currentIndex]['fiszka_id'];

        const message= {
            fiszka_id: fiszka_id,
            user_grade: userGrade,
        }

        let response= await fetch('https://chn-apex-backend.azurewebsites.net/api/changeInterval/',{
                method: 'PATCH', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(message) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });
          
            let data= await response.json()
            nextFlashcard();
           
    }


    useEffect(()=>{
        getFlashcards()
    }, []);

    return (
        <>
            <div>
            <div id="player"></div>
                <h1>Fiszki page</h1>
                <h1>
                {fiszki !== null && fiszki[currentIndex] &&(fiszki[currentIndex]['character'])}
                </h1>
                
                <button onClick={handleBack}>Kliknij zobaczyc back</button>
                
                {backIndex !== 0 && fiszki != null && fiszki[currentIndex] && (
                    <div>
                     
                        <h1>
                            <div id= 'flashcardContent'>
                            {console.log("dlugosc fiszki: ", fiszki.length)}
                            Character{fiszki[currentIndex]['character']}<br></br>
                            Definicja: {fiszki[currentIndex]['definition']}<br></br>
                           Pin Yin:  {fiszki[currentIndex]['pin_yin']}<br></br>
                            Zdanie: {fiszki[currentIndex]['sentence']}
                            </div>
                        </h1>
                    </div>
                )}

                {currentIndex == fiszki.length &&(
                    <div>
                        <h1>Zrobiłes juz wszystkie fiszki!!!</h1>
                    </div>
                )}

                {fiszki.length == 0 &&(
                    <div>
                        <h1>Nie masz fiszek do odrobienia, dodaje je studiując episyd lub poczekaj gdy znowu będą dostępne</h1>
                    </div>
                )}
                <h1>How easy was the flashcard?</h1>
                <button onClick={(e)=>anki(e)} >0</button>
                <button onClick={(e)=>anki(e)}>1</button>
                <button onClick={(e)=>anki(e)}>2</button>
                <button onClick={(e)=>anki(e)}>3</button>
                <button onClick={(e)=>anki(e)}>4</button>
                <button onClick={(e)=>anki(e)}>5</button>
            </div>
        </>
    );
};
                                    
    

export default Flashcards;
