import HeroImage from './assets/images/hero.jpg'
import './assets/styles/Game.scss'

function Game() {

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
