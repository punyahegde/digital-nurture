import './App.css';
import ListofPlayers from './ListofPlayers';
import Scorebelow70 from './Scorebelow70';
import ListofIndianPlayers from './ListofIndianPlayers';
import { OddPlayers, EvenPlayers } from './IndianPlayers';

function App() {

  const players = [
    { name: "Sachin1", score: 95 },
    { name: "Dhoni", score: 85 },
    { name: "Virat", score: 90 },
    { name: "Rohit", score: 72 },
    { name: "Rahul", score: 68 },
    { name: "Hardik", score: 75 },
    { name: "Jadeja", score: 69 },
    { name: "Ashwin", score: 80 },
    { name: "Bumrah", score: 67 },
    { name: "Shami", score: 65 },
    { name: "Siraj", score: 88 }
  ];

  const team = [
    "Sachin",
    "Sehwag",
    "Dravid",
    "Ganguly",
    "Yuvraj",
    "Dhoni"
  ];

  const flag = true;

  if (flag) {
    return (
        <div className="App">
          <h1>List of Players</h1>
          <ListofPlayers players={players} />

          <h1>List of Players having Scores Less than 70</h1>
          <Scorebelow70 players={players} />
        </div>
    );
  } else {
    return (
        <div className="App">
          <h1>Odd Players</h1>
          <OddPlayers {...[team]} />

          <h1>Even Players</h1>
          <EvenPlayers {...[team]} />

          <ListofIndianPlayers />
        </div>
    );
  }
}

export default App;