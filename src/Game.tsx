import HeroImage from './assets/images/hero.jpg'
import './styles/Game.scss'


function Game() {

  return (
 
    <main>
        <div className='hero'>
            <img src={HeroImage} alt="" />
        </div>
    </main>
     
  )
}

export default Game
