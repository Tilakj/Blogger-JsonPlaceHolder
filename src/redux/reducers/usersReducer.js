import { SET_USERS_REQUEST, SET_USERS_SUCCESS, SET_USERS_FAILURE } from "../actionTypes/userTypes"

const initialUsersState = {
    loading: false,
    users: [],
    error: ''
}
const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case SET_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SET_USERS_SUCCESS:
            return {
                loading: false,
                users: action.payload,
                error: ''
            }
        case SET_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default usersReducer