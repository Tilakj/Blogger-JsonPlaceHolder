import { SET_USERS_REQUEST, SET_USERS_SUCCESS, SET_USERS_FAILURE } from '../actionTypes/userTypes'
import axios from '../../config/axios'
export const setUsersRequest = () => {
    return {
        type: SET_USERS_REQUEST
    }
}
export const setUsersSuccess = users => {
    return {
        type: SET_USERS_SUCCESS,
        payload: users
    }
}
export const setUsersFailure = error => {
    return {
        type: SET_USERS_FAILURE,
        payload: error
    }
}

export const startFetchUsers = () => {
    return (dispatch) => {
        dispatch(setUsersRequest())
        axios.get('/users')
            .then(res => {
                dispatch(setUsersSuccess(res.data))
            })
            .catch(err => {
                dispatch(setUsersFailure(err))
            })
    }
}


