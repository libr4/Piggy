import React, {useState, useReducer, useContext} from 'react'
import { CLEAR_ALERT, DISPLAY_ALERT, REGISTER_USER_ERROR, REGISTER_USER_SUCCESS, LOGIN_USER_BEGIN, LOGIN_USER_ERROR, LOGIN_USER_SUCCESS, TOGGLE_SIDEBAR, LOGOUT_USER, TOGGLE_DROPDOWN } from './actions';
import reducer from './reducer'; 
import axios from 'axios';

let user = localStorage.getItem('user');
if (user) user = JSON.parse(user);
console.log('appcontext', user);

export const initialState = {
    isLoading:false,
    showAlert:false,
    alertText:'',
    alertType:'',
    user: user,
    token: user ? user.token : null,
    userLocation: user ? user.location : '',
    jobLocation: user ? user.location : '',
    hideBar:false,
    dropMenu: false
}

//primeiro se cria o context
//AppContext terá propriedades como .Provider
//e .Consumer.
const AppContext = React.createContext();


//daí se cria o provider, que recebe tags children
//isso aí é um function component, tudo o que estiver dentro dele
//poderá acessar os valores do context
export function AppProvider({children}) {

    //o useReducer serve para gerenciar multiplos states,
    //que mudam de uma forma um pouco mais complexo.
    //Ela funciona parecido com useState:
    //Retorna duas variáveis. A state é, como em useState,
    //a variável que vai mudar.
    //dispatch é a função responsável por mudar state,
    //assim como setState. Porém, ela recebe, geralmente,
    //dois parâmetros: action e payload.
    //A action será responsável por dizer o que vai acontecer,
    //é um objeto responsável por se referir ao tipo da mudança.
    //O payload é um valor associado à mudança que ocorrerá no state.
   const [state, dispatch] = useReducer(reducer, initialState);

   const displayAlert = () => {
       dispatch({type: DISPLAY_ALERT})
    }

    const clearAlert = () => {
        dispatch({type:CLEAR_ALERT})
    }

    const addUserToLocalStorage = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', user.token);
        localStorage.setItem('location', user.location);
    }

    const removeUserFromLocalStorage = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('location')
    }

    const registerUser = async (currentUser) => {
         try {
            const response = await axios.post('/api/v1/auth/register', currentUser);
            console.log(response)
            const {user} = response.data;
            console.log('USER', user)

            //já configura no state os dados do usuário
            dispatch({
                type:REGISTER_USER_SUCCESS,
                payload: user
            })
            addUserToLocalStorage(user);
         } catch (error) {
             console.log('THIS IS THE ERROR', error.response)
             dispatch({type:REGISTER_USER_ERROR, payload:{msg:error.response.data.msg}})
         }
    }

    const loginUser = async (data) => {
        dispatch({type:LOGIN_USER_BEGIN})
        try {
            const response = await axios.post('/api/v1/auth/login', data);
            console.log(response.data);
            const user = response.data;
            dispatch({
                type:LOGIN_USER_SUCCESS,
                payload:user
            })
            addUserToLocalStorage(user)
        } catch (error) {
            console.log('THIS IS THE LOGIN ERROR', error.response)
             dispatch({type:LOGIN_USER_ERROR, payload:{msg:error.response.data.msg}})
        }
    }

    const toggleSidebar = ()=> {
        dispatch({
            type:TOGGLE_SIDEBAR
        })
    }

    const toggleDropdown = ()=> {
        dispatch({
            type:TOGGLE_DROPDOWN
        })
    }

    const logoutUser = () => {
        dispatch({type:LOGOUT_USER});
        removeUserFromLocalStorage();
    }

    //outro passo importante é este. Se as variáveis não forem passadas em value, elas
    //não serão acessíveis através de useAppContext em outros arquivos
    return <AppContext.Provider value={{...state, displayAlert, clearAlert, registerUser, loginUser, toggleSidebar, toggleDropdown, logoutUser}}>{children}</AppContext.Provider>
  
}

//custom hook, precisa retornar, como feito abaixo
//é essa a função que vai carregar os valores do context
//os valores serão extraídos dela quando se quiser um valor
//contido no contexto
export const useAppContext = () =>  {
   return useContext(AppContext)
}
