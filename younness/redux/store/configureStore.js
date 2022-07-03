/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import { createStore, combineReducers } from 'redux';
import countReducer from '../reducers/countReducer';
/*
const rootReducer = combineReducers(
{ count: countReducer }
);
const configureStore = () => {
return createStore(rootReducer);
}
*/

export default createStore(countReducer);