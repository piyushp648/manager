import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    REGISTER_USER_SUCCESS
} from './types';
import firebase from '@firebase/app';
import {Actions} from 'react-native-router-flux';


export const emailChanged = (text) => {
    return {
        type: EMAIL_CHANGED,
        payload: text
    }
};

export const passwordChanged = (text) => {
    return {
        type: PASSWORD_CHANGED,
        payload: text
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {

        dispatch({type: LOGIN_USER});   

        require('firebase/auth');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))

            .catch((error) => loginUserFailed(dispatch));/* {
                console.log(error);
                
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(user => loginUserSuccess(dispatch, user))
                    .catch(() => loginUserFailed(dispatch))
            }); */
    }
};

export const registerUser = ({email, password}) => {
    return (dispatch) => {

        dispatch({type: REGISTER_USER});
        require('firebase/auth');

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registerUserSuccess(dispatch, user))
            .catch(() => registerUserFailed(dispatch))

    }
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main();
}

const loginUserFailed = (dispatch) => {
    dispatch({
        type: LOGIN_USER_FAILED
    });
}

const registerUserSuccess = (dispatch, user) => {
    dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: user
    });

    Actions.main();
}

const registerUserFailed = (dispatch) => {
    dispatch({
        type: REGISTER_USER_FAILED
    });
}
 