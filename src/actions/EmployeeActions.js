import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEES_FETCH_SUCCESS
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
    require('firebase/database');
    require('firebase/auth');
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
            .on('value', snapshot => {
                dispatch({type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val()})
            });
        /**anytime theres new data, it automatically fetches new data for
         *  the rest of the life of out appln */
    };
};