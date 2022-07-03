/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import { COUNTER_CHANGE,FULLNAME_CHANGE,IMAGEURL_CHANGE } from '../constants';

const initialState = {
count: 5,
imageUrl : null,
fullName : null
};
const countReducer = (state = initialState, action) => {
switch(action.type) {
case COUNTER_CHANGE:
    return {
    ...state,
    count:action.payload
    };
case IMAGEURL_CHANGE :
    return {
        ...state,
        imageUrl :action.payload
    }
case FULLNAME_CHANGE : 
    return {
        ...state,
        fullName : action.payload
    }
default:
return state;
}
}
export default countReducer;