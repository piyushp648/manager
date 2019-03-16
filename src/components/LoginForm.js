import React, { Component } from 'react';
import {View, Text} from 'react-native';
import {
    Card,
    CardSection,
    Button,
    Input,
    Spinner
} from './common';
import { connect } from 'react-redux';
import {
    emailChanged, 
    passwordChanged, 
    loginUser, 
    registerUser 
} from '../actions';


class LoginForm extends Component {

    onEmailChange(text) {
        //console.log(this.props);
        this.props.emailChanged(text);
    }

    onPasswordChange(text) {
        this.props.passwordChanged(text);
    }

    onButtonPress() {
        const {email, password } = this.props;
        this.props.loginUser({email, password});
    }

    onRegisterButtonPress() {
        const {email, password} = this.props;
        this.props.registerUser({email, password});
    }

    

    renderError() {
        if(this.props.error) {
            return (
                <View style={{backgroundColor: 'white'}}>
                    <Text style={styles.errorTextStyle}>
                        {this.props.error}
                    </Text>
                </View>
            )
        }
    }

    renderButtons() {
        if(this.props.loading) {
            return <Spinner size="large" />;
        }

        return (
            <View>
            <CardSection>

            <Button
                onPress={this.onButtonPress.bind(this)}
            >
            Log in
            </Button>
            </CardSection>
            <CardSection>
            <Button 
                onPress={this.onRegisterButtonPress.bind(this)}
            >
            Register
            </Button>

            </CardSection>
            </View>
        );
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Email"
                        placeholder="john_doe@email.com"
                        onChangeText={this.onEmailChange.bind(this)}
                        value={this.props.email}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Password"
                        placeholder="********"
                        secureTextEntry
                        onChangeText={this.onPasswordChange.bind(this)}
                        value={this.props.password}
                    />
                </CardSection>


                
                {this.renderError()}

                
                {this.renderButtons()}
                
            </Card>
        );
    }
}

const styles = {
    errorTextStyle: {
        fontSize:20,
        alignSelf:'center',
        color: 'red'
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    /* return {
        email: state.auth.email,
        password: state.auth.password,
        error: state.auth.error
    }; */
    const {email, password, error, loading} = state.auth;

    return ({
        email, password, error, loading
    })
};

export default connect(mapStateToProps, {
    emailChanged, passwordChanged, loginUser, registerUser
})(LoginForm);