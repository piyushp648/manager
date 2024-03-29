import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    email: '',
    password: '',
    user:null,
    error: '',
    loading: false
}

export default (state = INITIAL_STATE, action) => {
    console.log(action);
    
    switch (action.type) {

        case EMAIL_CHANGED: 
            return { ...state, email: action.payload};

        case PASSWORD_CHANGED:
            return { ...state, password: action.payload};

        case LOGIN_USER:
            return {...state, loading: true, error: ''}

        case LOGIN_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};
        
        case LOGIN_USER_FAILED:
            return {...state, error: 'Authentication Failed.', password: '', loading: false};
        
        case REGISTER_USER:
            return{...state, loading: true, error: ''};
        
        case REGISTER_USER_SUCCESS:
            return {...state, ...INITIAL_STATE, user: action.payload};

        case REGISTER_USER_FAILED:
            return {...state, error:'Registration Failed.', loading:false, password:''};

        

        default:
            return state;
    }
}