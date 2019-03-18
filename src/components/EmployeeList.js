import  _ from "lodash";
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {

    componentWillMount() {
        this.props.employeesFetch();
    }

    // componentWillReceiveProps(nextProps) {
    //     /**next props are the next set of props that this component
    //      * will be rendered with 
    //      * this.props is still the old set of props
    //      */

    //     //this.createDataSource(nextProps);

    // }


    renderItem(employee) {
        return <ListItem employee={employee}/>
    }

    render() { 
        // console.log(this.props);    
        
        return (
            <FlatList 
                data={this.props.employees}
                renderItem={this.renderItem}
                keyExtractor={(employee) => employee.uid.toString()}
            />
            
        );
    }
}

const mapStateToProps = state => {

    const employees = _.map(state.employees, (val, uid) =>{
        return {...val, uid};
    });
    console.log(employees);
    return {employees};
}

export default connect(mapStateToProps, {employeesFetch})(EmployeeList);