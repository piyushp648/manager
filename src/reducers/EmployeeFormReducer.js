import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEE_SAVE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone:'',
    shift:''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EMPLOYEE_UPDATE:
            //action.payload === { prop: 'name', value: 'jane'}
            return {...state, [action.payload.prop] : action.payload.value};
            //key interpolation
        case EMPLOYEE_CREATED:
            return INITIAL_STATE;

        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;

        default:
            return state;
    }
}