import './assets/styles/Start.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setPlayer1, setPlayer2 } from './redux/slices/playersSlice.js'; // Importa le azioni
import aliensJson from './assets/aliens.json';
import { Link } from 'react-router-dom';

function Start() {
  const aliens = aliensJson;
  
  // Hook per inviare azioni a Redux
  const dispatch = useDispatch(); 
  // Leggi lo stato Redux
  const player1Selection = useSelector((state) => state.players.player1);
  const player2Selection = useSelector((state) => state.players.player2);

  // salvataggio selezioni 
  const handleChange1 = (e) => {
    // Aggiorna Redux con la scelta del player 1
    dispatch(setPlayer1(e.target.value)); 
  };
  const handleChange2 = (e) => {
    // Aggiorna Redux con la scelta del player 2
    dispatch(setPlayer2(e.target.value)); 
  };

  return (
    <main>
      <h1 className="text-center">Aliens Fighting Championship</h1>

      <section className="container p-5">
        <h5 className="text-center">SCELTA PERSONAGGI</h5>
        <div className="d-flex justify-content-evenly">
          <div className="player1 border">
            <div>PLAYER 1</div>
            <select value={player1Selection} onChange={handleChange1}>
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>
                  {alien.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="player2 border">
            <div>PLAYER 2</div>
            <select value={player2Selection} onChange={handleChange2}>
              {aliens.map((alien, index) => (
                <option key={index} value={alien.nome}>
                  {alien.nome}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-center">
          {player1Selection.length > 0 && player2Selection.length > 0 && (
            <Link to={`/Game`} className="btn btn-primary">
              START
            </Link>
          )}
        </div>

        <div>PLAYER1: {player1Selection}</div>
        <div>PLAYER2: {player2Selection}</div>
      </section>
    </main>
  );
}

export default Start;
