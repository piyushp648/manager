import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS
} from './types';
import firebase from "@firebase/app";
import { Actions } from 'react-native-router-flux';

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
}

export const employeeCreate = ({ name, phone, shift }) => {
    // console.log(name, phone, shift);
    require('firebase/database');
    require('firebase/auth');
    const { currentUser } = firebase.auth();
    
    return (dispatch) => {

    firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .push({name, phone, shift})
        .then(() => {
            dispatch({type: EMPLOYEE_CREATED});
            Actions.pop();
        });
    
    }
    
}

export const employeesFetch = () => {
    
    require('firebase/auth');
    const { currentUser } = firebase.auth();
    
    require('firebase/database');
    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()})
            });
        /**anytime theres new data, it automatically fetches new data for
         *  the rest of the life of out appln */
    };
};

export const employeeSave = ({name, phone, shift, uid}) => {
    require('firebase/database');
    require('firebase/auth');
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .set({name, phone, shift})
        .then( () => {
            dispatch({type: EMPLOYEE_SAVE_SUCCESS})
            Actions.pop();
        });
    }
}

export const employeeDelete = ({uid}) => {
    require('firebase/database');
    require('firebase/auth');
    const { currentUser } = firebase.auth();

    return() => {
        firebase.database().ref(`users/${currentUser.uid}/employees/${uid}`)
        .remove()
        .then(() =>{
            Actions.pop();
        })
    }
}