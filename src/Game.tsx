import HeroImage from './assets/images/hero.jpg'
import './assets/styles/Game.scss'
import { useSelector } from 'react-redux';

function Game() {
  console.log(useSelector((state) => state.players.player1))
  console.log(useSelector((state) => state.players.player2))
  return (
    <main>   
      <section>
        <h2 className='ms-title'>Aliens Fighting Championship</h2>
        <div className='hero'>
            <img src={HeroImage} alt="" />
        </div>
      </section>  
    </main>
  )
}

export default Game
