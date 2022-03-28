import { useState, useEffect } from 'react';
import { FormRow, Logo, Alert } from '../components';
import { useAppContext } from '../context/AppContext';
import {useNavigate} from 'react-router-dom'
// import '../index.css'

//os valores iniciais da submissão
const initialState = {
  name:'',
  email:'',
  username:'',
  password:'',
  isMember:false,
}

export default function Register() {
  let navigate = useNavigate();

  const {user, showAlert, displayAlert, clearAlert, registerUser, isLoading, loginUser} = useAppContext();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    clearAlert();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, username, password, isMember, email} = values;
    // if (!username || !password || !email || (!isMember && !name)) {
    //   displayAlert();
    //   console.log('sumbmit event')
    //   return;
    // }
    const user = {
      name,
      email,
      username,
      password
    }
    !isMember? registerUser(user):loginUser(user);
  }

  useEffect(() => {
    if (user) navigate('/')
  }, [user, navigate])

  function setToggle() {
    setValues({...values, isMember:!values.isMember})
  }

  return (
      <form className="form" onSubmit={handleSubmit}>
          <Logo/>
          <h3>{values.isMember ? 'Login':'Register'}</h3>
         
          {showAlert && <Alert />}
         
         
       {!values.isMember && <FormRow name='name' type='text'  handleChange={handleChange} value={values.name} labelText='Nome'/>}
       {!values.isMember && <FormRow name='email' type='email'  handleChange={handleChange}  value={values.email} labelText='Email' />}
        <FormRow name='username' type='text'  handleChange={handleChange}  value={values.username} labelText='Usuário'/>
        <FormRow name='password' type='password'  handleChange={handleChange}  value={values.password} labelText='Password' />

        <button className='btn btn-hero' type='submit' disabled={isLoading}>Send</button>
       <p>{!values.isMember? "Já é cadastrado?":"Precisa se cadastrar?"} <button className='member-btn' type='button' onClick={setToggle}>{!values.isMember? 'Login':'Inscreva-se'}</button> </p>
      </form>
  )
}
