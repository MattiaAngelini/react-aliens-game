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

function Game() {
  const player1Choice = useSelector((state) => state.players.player1)
  const player2Choice = useSelector((state) => state.players.player2)
  const aliens = aliensJson;
  console.log(aliens)
 
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

  return (
    <main>   
      <section className='game'>
        <h2 className='ms-title'>Aliens Fighting Championship</h2>

          <div className='hp1'>
            <div className='namePlayer'>{player1Choice}</div>
            <div className='bar'></div>
          </div>
        
          <div className='hp2'>
            <div className='namePlayer'>{player2Choice}</div>
            <div className='bar'></div>
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
            alieno.attacchi.filter((attacco) => alieno.nome === player1Choice).map((attacco) => (      
                <div className='selectionAtt'>
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
