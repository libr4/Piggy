import { DISPLAY_ALERT, 
        CLEAR_ALERT, 
        REGISTER_USER_BEGIN, 
        REGISTER_USER_SUCCESS, 
        REGISTER_USER_ERROR, 
        LOGIN_USER_BEGIN, 
        LOGIN_USER_SUCCESS, 
        LOGIN_USER_ERROR,
        TOGGLE_SIDEBAR,
        LOGOUT_USER,
        TOGGLE_DROPDOWN} from "./actions";

import { initialState } from "./AppContext";

const reducer = (state, action) => {
    switch(action.type) {
        case DISPLAY_ALERT:
            return {
                ...state,
                showAlert: true,
                alertText:'Please, provide all values!',
                alertType:'danger'
            }
        case CLEAR_ALERT:
            return {...state,
                    showAlert:false,
                    alertType:'',
                    alertText:''
            }
        case REGISTER_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                showAlert:true,
                alertText:'You\'ve been registered! Redirecting... ',
                alertType:'success',
                user: action.payload,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location
            }
        case REGISTER_USER_ERROR:
            return {
                ...state,
                isLoading:false,
                showAlert:true,
                alertType:'danger',
                alertText: action.payload.msg
            }
        case LOGIN_USER_BEGIN:
            return {
                ...state,
                isLoading: true
            }
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading:false,
                showAlert:true,
                alertText:'Entrando... ',
                alertType:'success',
                user: action.payload,
                token: action.payload.token,
                userLocation: action.payload.location,
                jobLocation: action.payload.location
            }
        case LOGIN_USER_ERROR:
            return {
                ...state,
                isLoading:false,
                showAlert:true,
                alertType:'danger',
                alertText: action.payload.msg
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                hideBar:!state.hideBar
            }
        case TOGGLE_DROPDOWN:
            return {
                ...state,
                dropMenu:!state.dropMenu
            }
            
        case LOGOUT_USER:
            return {
                ...initialState,
                user: null,
                token: null,
                userLocation: '',
                jobLocation: ''
            }
    }
    throw new Error(`no such action! ${action.type}`)
}

export default reducer;