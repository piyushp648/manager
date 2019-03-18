import _ from 'lodash';
import React, { Component } from 'react';
import Communications from "react-native-communications";
import EmployeeForm from "./EmployeeForm";
import { connect } from 'react-redux';
import { employeeUpdate, employeeSave, employeeDelete } from "../actions";
import { Card, CardSection, Button, Confirm } from './common';

class EmployeeEdit extends Component {

    state = {
        showModal: false
    }

    componentWillMount() {
        _.each(this.props.employee.item, (value, prop) => {
            this.props.employeeUpdate({ prop, value });
        })
        //console.log("Inside edit: " + this.props.employee);
    }



    onButtonPress() {
        const { name, phone, shift } = this.props;
        // console.log(this.props);
        this.props.employeeSave({ name, phone, shift, uid: this.props.employee.item.uid });
    }

    onTextPress() {
        const { phone, shift } = this.props;
        const msg = `Your upcoming shift is on ${shift}`;
        Communications.text(phone, msg);
    }

    onAccept() {
        const { uid } = this.props.employee.item;
        this.props.employeeDelete({ uid });
    }

    onDecline() {
        this.setState({showModal:false});
    }
    render() {
        return (
            <Card>
                <EmployeeForm />
                <CardSection>
                    <Button
                        onPress={this.onButtonPress.bind(this)}
                    >
                        Save changes
                    </Button>
                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.onTextPress.bind(this)}
                    >
                        Text Schedule
                    </Button>
                </CardSection>

                <CardSection>
                    <Button
                        onPress={() => this.setState({ showModal: !this.state.showModal })}
                    >
                        Fire Employee
                    </Button>
                </CardSection>

                <Confirm
                    visible={this.state.showModal}
                    onAccept={this.onAccept.bind(this)}
                    onDecline={this.onDecline.bind(this)}
                >
                    Are your sure you want to delete this?
                </Confirm>
            </Card>
        );
    }
}

const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift };
}
export default connect(mapStateToProps, {
    employeeUpdate,
    employeeSave,
    employeeDelete
})(EmployeeEdit);