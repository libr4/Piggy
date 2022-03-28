import { Link } from 'react-router-dom'
import '../index.css'

export const ErrorPage = () => {
  return (
    <div className='errorpage'>
      404
      <p>
        PÁGINA NÃO ENCONTRADA
      </p>
      <Link id='backhome' to='/'>Back Home</Link>
      </div>
    // <Wrapper>sdf</Wrapper>
  )
}
