import React, { Component } from 'react';
import { Picker, Text } from 'react-native';
import { Card, CardSection, Button, Input } from './common';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';


class EmployeeCreate extends Component {

    onButtonPress() {
        const { name, phone, shift } = this.props;

        this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                        label="Name"
                        placeholder="Jane"
                        value={this.props.name}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'name', value })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        label="Phone"
                        placeholder="555-555-5555"
                        value={this.props.phone}
                        onChangeText={value => this.props.employeeUpdate({ prop: 'phone', value })}
                    />
                </CardSection>

                <CardSection style={{flexDirection: 'row'}}>
                    <Text style={styles.pickerLabelStyle}> Shift </Text>
                    <Picker
                        selectedValue={this.props.shift}
                        onValueChange={value => this.props.employeeUpdate({ prop: 'shift', value })}
                        style={{ flex: 2 }}
                        itemStyle={styles.pickerItemStyle}
                    >
                        <Picker.Item label="Monday" value="Monday" />
                        <Picker.Item label="Tuesday" value="Tuesday" />
                        <Picker.Item label="Wednesday" value="Wednesday" />
                        <Picker.Item label="Thursday" value="Thursday" />
                        <Picker.Item label="Friday" value="Friday" />
                        <Picker.Item label="Saturday" value="Saturday" />
                        <Picker.Item label="Sunday" value="Sunday" />
                    </Picker>

                </CardSection>

                <CardSection>
                    <Button
                        onPress={this.onButtonPress.bind(this)}
                    >
                        Create
                    </Button>
                </CardSection>

            </Card>
        );
    }
}

const styles = {
    pickerLabelStyle: {
        fontSize:18,
        paddingLeft: 15,
        flex:1,
        alignSelf: 'center'
    },
    pickerItemStyle: {
        color: '#000',
        paddingLeft:5
    }
}
const mapStateToProps = (state) => {
    const { name, phone, shift } = state.employeeForm;

    return { name, phone, shift }
};

export default connect(mapStateToProps, {
    employeeUpdate,
    employeeCreate
})(EmployeeCreate);