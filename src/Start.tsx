import './assets/styles/Start.scss'
import { useState } from "react";

import aliensJson from './assets/aliens.json'

function Start() {
  const [player1Selection, setPlayer1Selection] = useState(''); 
  const [player2Selection, setPlayer2Selection] = useState('');
  const aliens = aliensJson;

  return (
    <main>
      <h1 className="text-center">Aliens Ultimate Fighting</h1>

      <section className="container p-5">
        <h5 className="text-center">SCELTA PERSONAGGI</h5>

        <div className="d-flex justify-content-evenly">

          <div className="player1 border"> 
            <div>PLAYER 1</div>

            <select value={player1Selection} onChange={(e) => setPlayer1Selection(e.target.value)}>     
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>{alien.nome}</option>
              ))}

            </select>

          </div>
        
          <div className="player2 border"> 
            <div>PLAYER 2</div>
            <select value={player2Selection} onChange={(e) => setPlayer2Selection(e.target.value)}>
              
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>{alien.nome}</option>
              ))}
            </select>
          </div>
        </div>
      
        <div className="d-flex justify-content-center">
          <button className="btn btn-primary">START</button>
        </div>

        <div>PLAYER1: {player1Selection}</div>
        <div>PLAYER2: {player2Selection}</div>
      </section>
    </main>
  )
}

export default Start;
