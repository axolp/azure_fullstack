import React, {useRef} from 'react'
import { Link } from 'react-router-dom';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home(){



    const chart_options = {
        indexAxis: 'x', // Użyj 'y', jeśli chcesz pasków poziomych, 'x' dla pionowych
        elements: {
          bar: {
            borderWidth: 2,
          },
        },
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Histogram HSK',
          },
        },
      };
    const episodes = [
        { title: "Patriotyzm", description: "For the topic I am going to talk about today, what is patriotism? I think it's important to appreciate some aspects. If it weren't for these, what kind of country do you love?", thumbnail: "episode1.jpg", hsk_histogram: {1: 698, 789: 276, 2: 171, 3: 93, 4: 50, 5: 17, 6: 13}, key_words: {'爱国': 11, '讲': 8, '所以': 7, '牺牲': 5, '不是': 4, '本来': 3, '因为': 3, '很多': 3, '就是': 3, '特别': 3} },
        { title: "TED TALK", description: "Opis odcinka 2", thumbnail: "episode2.jpg", hsk_histogram: {1: 190, 789: 111, 2: 65, 3: 36, 4: 16, 5: 9, 6: 7}, key_words: {'爱国': 11, '讲': 8, '所以': 7, '牺牲': 5, '不是': 4, '本来': 3, '因为': 3, '很多': 3, '就是': 3, '特别': 3}},
      ];


    return(
        <div>
        <h1>Home page</h1>
        <div className="grid-container">
        {episodes.map((episode, index) => (
          <div key={index} className="grid-item">
             <Link to={`episode${index+1}`}>
          
            
            
            
            <h2>{episode.title}</h2>
            <img src={`/thumbnails/${episode.thumbnail}`}   alt="Episode thumbnail"></img>
            <p>{episode.description}</p>

            
         <div>
              <Bar
                options={chart_options}
                data={{
                  labels: Object.keys(episode.hsk_histogram).map(level => `HSK ${level}`),
                  datasets: [
                    {
                      label: 'Liczba wystąpień',
                      data: Object.values(episode.hsk_histogram),
                      borderColor: 'rgba(255, 99, 132, 1)',
                      backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    },
                  ],
                }}
              />
            </div>
                <h2> Key characters </h2>
                    <h3>
                        {Object.keys(episode.key_words).map(character =>  `  ${character}  `)}
                    </h3>
            </Link>
          </div>
        ))}
      </div>
      </div>


    );

}

export default Home;