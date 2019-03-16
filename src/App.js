import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import firebase from '@firebase/app';
import LoginForm from './components/LoginForm';
import Router from './Router'

class App extends Component {

    initializeFirebase() {
        const config = {
            apiKey: "AIzaSyCWbOcjhL4DwvvOE4AkpVaIM27QgCNigDg",
            authDomain: "manager-51626.firebaseapp.com",
            databaseURL: "https://manager-51626.firebaseio.com",
            projectId: "manager-51626",
            storageBucket: "manager-51626.appspot.com",
            messagingSenderId: "162398584397"
        }

        firebase.initializeApp(config);
    }

    componentWillMount() {
        this.initializeFirebase();
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
};

export default App;