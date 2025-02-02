import './assets/styles/Game.scss';
import flareonBack from './assets/images/flareon_back.jpg';
import flareonFront from './assets/images/flareon_front.jpg';
import glacioraBack from './assets/images/glaciora_back.jpg';
import glacioraFront from './assets/images/glaciora_front.jpg';
import meteoraxBack from './assets/images/meteorax_back.jpg';
import meteoraxFront from './assets/images/meteorax_front.jpg';
import voidonBack from './assets/images/voidon_back.jpg';
import voidonFront from './assets/images/voidon_front.jpg';
import aliensJson from './assets/aliens.json';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { currentWindow } from './assets/styles/breakpoint.ts';

function Game() {

  const aliensAvatar = [
    {
      id: 1,
      name: "Flareon",
      imgFront: flareonFront,
      imgBack: flareonBack,
    },
    {
      id: 2,
      name: "Glaciora",
      imgFront: glacioraFront,
      imgBack: glacioraBack,
    },
    {
      id: 3,
      name: "Meteorax",
      imgFront: meteoraxFront,
      imgBack: meteoraxBack,
    },
    {
      id: 4,
      name: "Voidon",
      imgFront: voidonFront,
      imgBack: voidonBack,
    },
  ];
  const aliens = aliensJson;
  const player1Choice = useSelector((state) => state.players.player1); // condivisi con altri componenti
  const player2Choice = useSelector((state) => state.players.player2); // condivisi con altri componenti
  // locale
  const [widthBar1, setWidth1] = useState(300);
  const [widthBar2, setWidth2] = useState(300);
  const [attackTurn, setAttack] = useState(player1Choice);
  const [selectedAttack, setSelectedAttack] = useState('');
  const [inputAttack1, setInputAttack1] = useState(false);
  const [inputAttack2, setInputAttack2] = useState(false);
  const [sizeWindow, setSizeWindow] = useState(currentWindow(window.innerWidth));
  const [responsiveImage, setResponsiveImage] = useState(120);
  const [timerTurn, setTimerTurn] = useState(1);
  
  function viewPortSize() {
    window.addEventListener('resize', () => {
      setSizeWindow(currentWindow(window.innerWidth)) 
      console.log(sizeWindow);
    });
  }
  
  function renderAlienBack() {
    for (let i = 0; i < aliensAvatar.length; i++) {
      if (aliensAvatar[i].name === player1Choice) {
        return aliensAvatar[i].imgBack;
      }
    }
  }
  
  function renderAlienFront() {
    for (let i = 0; i < aliensAvatar.length; i++) {
      if (aliensAvatar[i].name === player2Choice) {
        return aliensAvatar[i].imgFront;
      }
    }
  }
  
  function roundPlayer1() {
    if (attackTurn === player1Choice) {
      return "round-player";
    }
  }

  function roundPlayer2() {
    if (attackTurn === player2Choice) {
      return "round-player";
    }
  }

  // Al click di un attacco
  function attack(nomeAttacco: string, dannoAttacco: number) {
    let damageAttack: number;
    let damagePlayer1: number;
    let damagePlayer2: number;

    // valore e nome attacco selezionato
    setSelectedAttack(nomeAttacco);
    aliens.forEach((alieno) => {
      for (let i = 0; i < alieno.attacchi.length; i++) {
        if (alieno.attacchi[i].nome === selectedAttack) {
          damageAttack = alieno.attacchi[i].danno;
        }
      }
    });
    // gestione render animazione attacco, e riduzione barra HP
    
    if (attackTurn === player1Choice) {
      setAttack(player2Choice)
      setInputAttack2(false);
      setInputAttack1(true);
      setTimeout(() => {
        setWidth2((prevWidth) => Math.max(prevWidth - damagePlayer1, 0));
        damagePlayer1 = dannoAttacco;
      }, 400);
    }

    if (attackTurn === player2Choice) {
      setAttack(player1Choice);
      setInputAttack1(false);
      setInputAttack2(true);
      setTimeout(() => {
        setWidth1((prevWidth) => Math.max(prevWidth - damagePlayer2, 0));
        damagePlayer2 = dannoAttacco;
      }, 400);
    }
  }

   // gestione dimensione immagini in base a breakpoint.ts
   useEffect(() => {
    viewPortSize();
    if (sizeWindow === 'xxs' || sizeWindow === 'xs' || sizeWindow === 'sm') {
      setResponsiveImage(150);
    } else {
      return setResponsiveImage(250);
    }
  }, [sizeWindow]);

  // gestione vincitore
  useEffect(() => {
    if (widthBar1 <= 0) {
      alert('PLAYER 2 HA VINTO');
      window.history.back();
    } else if (widthBar2 <=  0) {
      alert('PLAYER 1 HA VINTO');
      window.history.back();
    }
  }, [widthBar1]);


  // gestione turni con timer 30 secondi
  useEffect(()=>{
      setTimeout(() => {
        setTimerTurn(timerTurn + 1)
        if(timerTurn === 30 && attackTurn === player1Choice){
        setAttack(player2Choice)
        setTimerTurn(0)
          }
          else if(timerTurn === 30 && attackTurn === player2Choice){
            setAttack(player1Choice)
            setTimerTurn(1)
          }
      },1000)
  
  }, [timerTurn])

  return (
    <main>
      <section className="picGame">
        <h3 className="ms-title text-center p-2">Aliens Fighting Championship</h3>
        <div className="d-lg-flex justify-content-evenly">
          
          <div className="borderHp">
            <div className="hp1">
              <div style={{ width: `${widthBar1}px` }} className="energy">
                <div className="namePlayer">{player1Choice}</div>
              </div>
            </div>
          </div>

        <div className='timer'>
          <span>{timerTurn}</span>
        </div>
          
          <div className='borderHp'>
            <div className="hp2">  
              <div style={{ width: `${widthBar2}px` }} className="energy">
                <div className="namePlayer">{player2Choice}</div>
              </div>
            </div>
          </div>
        
        </div>

        <div className="alienFront">
          <div className="d-flex justify-content-center">
            <div className={roundPlayer2()}>
              <img
                style={{ height: `${responsiveImage}px` }}
                className="front"
                src={renderAlienFront()}
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="alienBack">
          <div className="d-flex justify-content-center">
            <div className={roundPlayer1()}>
              <img
                style={{ height: `${responsiveImage}px` }}
                className="back"
                src={renderAlienBack()}
                alt=""
              />
            </div>
            
          </div>
        </div>

        <div className="menu">
          {aliens.map((alieno, index) =>
            alieno.attacchi
              .filter(() => alieno.nome === attackTurn)
              .map((attacco) => (
                <button 
                  
                  key={attacco.id}
                  onClick={() => attack(attacco.nome, attacco.danno)}
                  className="attackBox"
                >
                  <span>
                    {attacco.nome} - Danno: {attacco.danno}
                  </span>

                </button>
              ))
          )}
        </div>
        {inputAttack1 && <div className="attackAnimation1"></div>}
        {inputAttack2 && <div className="attackAnimation2"></div>}
      </section>
    </main>
  );
}

export default Game;
