/* eslint-disable react-native/no-inline-styles */
/* eslint-disable jsx-quotes */
/* eslint-disable eqeqeq */
/* eslint-disable space-infix-ops */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */

import { COUNTER_CHANGE,IMAGEURL_CHANGE,FULLNAME_CHANGE } from '../constants';
export const changeCount = (count) => {
return {
type: COUNTER_CHANGE,
payload: count
}
}

export const changeImageUrl = (url) => {
    return {
    type: IMAGEURL_CHANGE,
    payload: url
    }
}

export const changeFullName = (fullName) => {
    return {
    type: FULLNAME_CHANGE,
    payload: fullName
    }
}