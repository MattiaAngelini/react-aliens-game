import './assets/styles/Start.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayer1, setPlayer2 } from './redux/slices/playersSlice.js'; // Importa le azioni
import aliensJson from './assets/aliens.json';
import { Link } from 'react-router-dom';
import  { useState } from 'react';
import { useEffect } from 'react';
//img
import flareonFront from './assets/images/flareon_front.jpg'
import glacioraFront from './assets/images/glaciora_front.jpg';
import meteoraxFront from './assets/images/meteorax_front.jpg';
import voidonFront from './assets/images/voidon_front.jpg';

function Start() {
  const aliens = aliensJson;
  // Hook per inviare azioni a Redux
  const dispatch = useDispatch(); 
  // Leggi lo stato Redux
  const player1Selection = useSelector((state) => state.players.player1);
  const player2Selection = useSelector((state) => state.players.player2);
  const [selectedAlienImage1, setSelectedAlienImage1] = useState('');
  const [selectedAlienImage2, setSelectedAlienImage2] = useState('');

  // salvataggio in redux della scelta player1 
  const handleChange1 = (e) => {
    dispatch(setPlayer1(e.target.value));
  };
  // salvataggio in redux della scelta player2
  const handleChange2 = (e) => {
    dispatch(setPlayer2(e.target.value));
  };
  //per comparsa bottone in caso di scelta uguale
  function handleChoose(){
    //invocata in jsx per render button
    return player1Selection.length > 0 && 
           player2Selection.length > 0 && 
           player1Selection !== player2Selection;
  }
  //render immagini in base a scelta utente
  useEffect(() => {
    if(player1Selection === 'Flareon'){
      setSelectedAlienImage1(flareonFront)
    } else if(player1Selection === 'Glaciora'){
      setSelectedAlienImage1(glacioraFront)
    }else if(player1Selection === 'Meteorax'){
      setSelectedAlienImage1(meteoraxFront)
    }else if(player1Selection === 'Voidon'){
      setSelectedAlienImage1(voidonFront)
    }
    if(player2Selection === 'Flareon'){
      setSelectedAlienImage2(flareonFront)
    } else if(player2Selection === 'Glaciora'){
      setSelectedAlienImage2(glacioraFront)
    }else if(player2Selection === 'Meteorax'){
      setSelectedAlienImage2(meteoraxFront)
    }else if(player2Selection === 'Voidon'){
      setSelectedAlienImage2(voidonFront)
    }
  }, [player1Selection, player2Selection]); // Dipendenze
  
  return (
    <main className='startMenu'>
      <section className="container">
        <h1 className="text-center">Aliens Fighting Championship</h1>
        <h3 className="text-center p-1">SELECT ALIEN</h3>    
        <div className="d-lg-flex d-block justify-content-evenly gap-5">
          
          <div className="player1 mt-4">
            <div>PLAYER 1</div>
            <select value={player1Selection} onChange={handleChange1}>
            <option value="" selected>Seleziona un Alieno</option>
              {/* OPTIONS PLAYER1*/}
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>
                  {alien.nome}
                </option>
              ))}
            </select>
            <div>
              {player1Selection.length > 0 && 
              (<img className='imgAvatar' src={selectedAlienImage1} alt="" />)}    
          </div>
          </div>

          <div className="player2 mt-4">
            <div>PLAYER 2</div>
            <select value={player2Selection} onChange={handleChange2}>
            <option value="" selected>Seleziona un Alieno</option>
              {/* OPTIONS PLAYER2*/}
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>
                  {alien.nome}
                </option>
              ))}
            </select>
            <div>
              { player2Selection.length > 0 && 
              (<img className='imgAvatar' src={selectedAlienImage2} alt="" />)}    
            </div>
          </div>

        </div>
  
          <div>
            {handleChoose() && (
              <Link to={`/Game`} className="btn-start">
                START
              </Link>
            )}
          </div>
      </section>
    </main>
  );
}

export default Start;
