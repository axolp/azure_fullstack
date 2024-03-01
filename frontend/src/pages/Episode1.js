import React, { useState, useEffect, useRef } from 'react';
import tr from '../transcrypts/episode1';

function Episode1() {
  
    const videoRef = useRef(null); // Referencja do playera YouTube
    const intervalRef = useRef(null); // Referencja do interwału
    const [ct, sCT]= useState(null);
    const lyricsDivRef= useRef(null);
    const [fContent, setFContent]= useState(null);
    const [sentence, setSentence]= useState("");


    const addFlashcard= async (e) => {
        let endTime= 0;
        console.log("bede zaczytawac długosc trwania wideo");
        console.log("ctL ", ct);
        for(let i= ct+1; i<ct+20; i++){
            if(tr[i]){
                console.log("tutaj konczy sie klip: ", i);
                endTime= i;
                break;
            }
        }
        

        const flashcard= {
            content:fContent,
            user_id: sessionStorage['user_id'],
            sentence: sentence,
            current_time: ct,
            duration_time_in_video: endTime,
            video_id: 'n8J0t7oKHTQ',
            
        }
        console.log(flashcard);

        let response= await fetch('https://chn-apex-backend.azurewebsites.net/api/addflashcard/',{
                method: 'POST', // Określenie metody HTTP
                headers: {
                    'Content-Type': 'application/json' // Określenie typu zawartości jako JSON
                },
                body: JSON.stringify(flashcard) // Przekształcenie danych obiektu JavaScript na ciąg JSON
            });
            console.log("teraz flashcard: ", flashcard);
            let data= await response.json()
            console.log(data)
            console.log(response.ok)
    }
 

  const CreateCharacterDiv= (hanzi, pinyin, definicja) =>{
      //console.log("tworze diva")
      const CharacterContainer= document.createElement('div');
      CharacterContainer.classList.add('CharacterContainer');
      

      const PinYinContainer= document.createElement('div');
      PinYinContainer.classList.add('PinYinContainer');
      PinYinContainer.innerText= pinyin;

      const HanZiContainer= document.createElement('div');
      HanZiContainer.classList.add('HanZiContainer');
      HanZiContainer.innerText= hanzi;

      const AngContainer= document.createElement('div');
      AngContainer.classList.add('AngContainer');
      AngContainer.innerText= definicja;
      

      CharacterContainer.addEventListener('click', () => {
        //console.log(CharacterContainer.innerText);
        //console.log(CharacterContainer.innerText.replace(/\n/g, '\\n'));

        //console.log('Kliknięto kontener znaku');
        setFContent(CharacterContainer.innerText);
        
    });

      

       CharacterContainer.appendChild(AngContainer);
       CharacterContainer.appendChild(HanZiContainer);
       CharacterContainer.appendChild(PinYinContainer);

       lyricsDivRef.current.appendChild(CharacterContainer);

  }
  const DeleteCharacterDivs=()=> {
    while(lyricsDivRef.current.firstChild){
        lyricsDivRef.current.removeChild(lyricsDivRef.current.firstChild);
    }
}
    useEffect(() =>{
        console.log(fContent)
        addFlashcard();
       
        
    }, [fContent]);

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
                    autoplay: 1, // Włącza autoodtwarzanie
                    // Możesz dodać więcej zmiennych odtwarzacza tutaj, jeśli potrzebujesz
                },
                events: {
                    'onReady': onPlayerReady,
                }
            });
        };

        // Inicjalizacja YouTube IFrame API
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const onPlayerReady = (event) => {
            // Funkcja wywoływana, gdy odtwarzacz jest gotowy
            // Ustawienie interwału, który sprawdza aktualny czas odtwarzania co sekundę
            intervalRef.current = setInterval(() => {
            const currentTime = Math.floor(event.target.getCurrentTime());
            sCT(currentTime);
           
            let sentence= "";
            if (tr[currentTime]){
              DeleteCharacterDivs();

              sentence= tr[currentTime][0];
              setSentence(sentence);
              
              let hanzi= "";
              let pinyin= "";
              let def= "";

              for(let i= 0; i<sentence.length; i++){
                //console.log(sentence);
                hanzi= tr[currentTime][0][i];
                pinyin= tr[currentTime][1][i];
                def= tr[currentTime][2][i]
                CreateCharacterDiv(hanzi, pinyin, def)
              }
            }
          
            //console.log(currentTime);
          
           
            
           // console.log(ct); // Wyświetlanie aktualnego czasu wideo w konsoli
        }, 700); // Co 1000 ms = 1 sekunda
    };

    return (
        <div className='videoPlayer'>
            <div id="player"></div> 
        
            <div ref= {lyricsDivRef} className='neo'>

            </div>
        </div>
    );
}

export default Episode1;
