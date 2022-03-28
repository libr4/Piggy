import {Logo} from '../components'
import { Link } from 'react-router-dom';
import '../index.css'


export const Landing = () => {
  return (
      <main className='landing'>
          <nav>
              <Logo />
              <div>
                  <p style={{color:'black',
                maxWidth: "50%", textAlign:"justify"}}>
                      Este site tem o único propósito de me fazer economizar dinheiro, de forma que eu possa controlar meus gastos e descobrir meus maus hábitos financeiros. Além de me incentivar a aprender mais sobre programação WEB através de um aprendizado direcionado a projeto, focado principalmente na stack MERN.
                  </p>
              </div>
              <Link to='/register' style={{color:'black'}} className='btn btn-hero'>Login/Cadastro</Link>
          </nav>
      </main>
  )
}
