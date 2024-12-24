import './assets/styles/Game.scss'
import flareonBack from './assets/images/flareon_back.jpg'
import flareonFront from './assets/images/flareon_front.jpg'
import glacioraBack from './assets/images/glaciora_back.jpg';
import glacioraFront from './assets/images/glaciora_front.jpg';
import meteoraxBack from './assets/images/meteorax_back.jpg';
import meteoraxFront from './assets/images/meteorax_front.jpg';
import voidonBack from './assets/images/voidon_back.jpg';
import voidonFront from './assets/images/voidon_front.jpg';
import aliensJson from './assets/aliens.json';
import { useSelector } from 'react-redux';
import  { useState } from 'react';
import { useEffect } from 'react';

function Game() {
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
  const aliens = aliensJson;
  const player1Choice = useSelector((state) => state.players.player1) //condivisi con altri componenti
  const player2Choice = useSelector((state) => state.players.player2) //condivisi con altri componenti
  //locale
  const [widthBar1, setWidth1] = useState(300); 
  const [widthBar2, setWidth2] = useState(300); 
  const [attackTurn,setAttack] = useState(player1Choice);
  const [selectedAttack, setSelectedAttack] = useState('');
  const [inputAttack1, setInputAttack1] = useState(false); 
  const [inputAttack2 , setInputAttack2] = useState(false); 

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

  function borderPlayer1(){
    if(attackTurn === player1Choice){
      return "border-player"
    }
  }
  function borderPlayer2(){
    if(attackTurn === player2Choice){
      return "border-player"
    }
  }

  //Al click di un atttacco
  function attack(nomeAttacco:string, dannoAttacco:number) {
    let damageAttack : number;
    let damagePlayer1: number;
    let damagePlayer2 : number;

    //valore e nome attacco selezionat0
    setSelectedAttack(nomeAttacco);
    aliens.forEach(alieno => {
      for(let i = 0; i < alieno.attacchi.length; i++){
        if(alieno.attacchi[i].nome === selectedAttack){
          damageAttack = alieno.attacchi[i].danno
        }
      }
    })
    //gestione render animazione attacco,e riduzione barra HP
    if (attackTurn === player1Choice) {
      damagePlayer1 = dannoAttacco    
      setInputAttack2(false)
      setInputAttack1(true)
     
      setTimeout(()=>{  
        setWidth2((prevWidth) => Math.max(prevWidth - damagePlayer1, 0) ); 
        setAttack(player2Choice); 
      },1000)
      
    } 
    
   if (attackTurn === player2Choice){
      damagePlayer2 = dannoAttacco
      setInputAttack1(false)
      setInputAttack2(true)
      setTimeout(()=>{
        setWidth1((prevWidth) => Math.max(prevWidth - damagePlayer2, 0) ); 
        setAttack(player1Choice)      
      },1000)    
        
    } 
  }
  //gestione vincitore
  useEffect(() => { //VINCITORE
    if (widthBar1 === 0) {
      alert('PLAYER 2 HA VINTO');
      window.history.back();
    } else if (widthBar2 === 0) {
      alert('PLAYER 1 HA VINTO');
      window.history.back();
    }
  }, [widthBar1, widthBar2]); 
  
  return (
    <main>   
      <section className='game'>
        <h3 className='ms-title'>Aliens Fighting Championship</h3>
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
          <div className={borderPlayer2()}>
             <img className='front'  src={renderAlienFront()} alt="" />
          </div>
             {inputAttack2 && <div className='attackAnimation2'></div>}
          </div>
         
        </div>
            
        <div className='alienBack' >
          <div className='d-flex justify-content-center'>
            <div className={borderPlayer1()}>
              <img className='back' src={renderAlienBack()} alt="" />
            </div>
            {inputAttack1 && <div className='attackAnimation1'></div>}
          </div>       
        </div>
      
        <div className='menu'>
          {aliens.map((alieno, index) => 
            alieno.attacchi.filter(() => alieno.nome === attackTurn).map((attacco) => (      
                <div key={attacco.id} onClick={() => attack(attacco.nome, attacco.danno)} className='attackBox'> 
                  <span>{attacco.nome} - Danno: {attacco.danno}</span>
                </div>
              ))
          )}
        </div>
        
      </section>  
    </main>
  )
}

export default Game
