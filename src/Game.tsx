import flareonBack from './assets/images/flareon_back.jpg'
import flareonFront from './assets/images/flareon_front.jpg'
import glacioraBack from './assets/images/glaciora_back.jpg';
import glacioraFront from './assets/images/glaciora_front.jpg';
import meteoraxBack from './assets/images/meteorax_back.jpg';
import meteoraxFront from './assets/images/meteorax_front.jpg';
import voidonBack from './assets/images/voidon_back.jpg';
import voidonFront from './assets/images/voidon_front.jpg';
import aliensJson from './assets/aliens.json';

import './assets/styles/Game.scss'
import { useSelector } from 'react-redux';
import  { useState } from 'react';

function Game() {
  const player1Choice = useSelector((state) => state.players.player1)
  const player2Choice = useSelector((state) => state.players.player2)
  const aliens = aliensJson;
  const hpPlayer1 = hpBar1()
  const hpPlayer2 = hpBar2()
  const [widthBar1, setWidth1] = useState(500); 
  const [widthBar2, setWidth2] = useState(500); 

  let [attackTurn,setAttack] = useState(player1Choice);

  console.log(widthBar1)

  const aliensAvatar = [
    {
      id: 1,
      name: "Flareon",
      imgFront: flareonFront,
      imgBack: flareonBack
    },
    {
      id: 2,
      name: "Glaciora",
      imgFront: glacioraFront,
      imgBack: glacioraBack
    },
    {
      id: 3,
      name: "Meteorax",
      imgFront: meteoraxFront,
      imgBack: meteoraxBack
    },
    {
      id: 4,
      name: "Voidon",
      imgFront: voidonFront,
      imgBack: voidonBack
    }
  ];

  function renderAlienBack(){
    for(let i = 0; i < aliensAvatar.length; i++){
          if(aliensAvatar[i].name === player1Choice){
            return aliensAvatar[i].imgBack
          }
    }
  }
  function renderAlienFront(){
    for(let i = 0; i < aliensAvatar.length; i++){
          if(aliensAvatar[i].name === player2Choice){
            return aliensAvatar[i].imgFront
          }
    }
  }

  function hpBar1(){
    let hp = 0; 
    for(let i = 0; i < aliens.length; i++){
      if(aliens[i].nome === player1Choice){
       hp = aliens[i].hp
      }         
      }
      return hp
    }

    function hpBar2(){
      let hp = 0;     
      for(let i = 0; i < aliens.length; i++){
        if(aliens[i].nome === player2Choice){
         hp = aliens[i].hp
        }         
        }
        return hp
      }

      function attack() {

        setAttack((turn) => {
          if (turn === player1Choice) {
            return player2Choice; // Se il turno attuale è player1, passa a player2
          } else {
            return player1Choice; // Altrimenti torna a player1
          }
        });

      }

  return (
    <main>   
      <section className='game'>
        <h2 className='ms-title'>Aliens Fighting Championship</h2>

        <div className='attackTurn'>TURNO ATTACCO: {attackTurn}</div>

          <div className='hp1'>
            <div className='namePlayer'>{player1Choice}</div>
            <div style={{ width: `${widthBar1}px` }} className='bar'></div>
          </div>
        
          <div className='hp2'>
            <div className='namePlayer'>{player2Choice}</div>
            <div style={{ width: `${widthBar2}px` }}  className='bar'></div>
          </div>
      
        <div className='alienFront'>
          <div className='d-flex justify-content-center'>
             <img className='front' src={renderAlienFront()} alt="" />
          </div>
          <div className="base">PLAYER 2: {player2Choice}</div>
        </div>
            
        <div className='alienBack' >
          <div className='d-flex justify-content-center'>
            <img className='back' src={renderAlienBack()} alt="" />
          </div>
          <div className="base">PLAYER 1: {player1Choice} </div>
        </div>
        <div className='menu'>
          {aliens.map((alieno, index) => 
            alieno.attacchi.filter((attacco) => alieno.nome === attackTurn).map((attacco) => (      
                <div onClick={attack} className='attack'>
                  {attacco.nome}
                </div>
              ))
          )}
        </div>

      </section>  
    </main>
  )
}

export default Game
