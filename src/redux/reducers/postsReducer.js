import { SET_POSTS_REQUEST, SET_POSTS_FAILURE, SET_POSTS_SUCCESS } from "../actionTypes/postTypes";

const initialPostValues = {
    posts: [],
    loading: false,
    error: ''
}

const postsRedcuer = (state = initialPostValues, action) => {
    switch (action.type) {
        case SET_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_POSTS_FAILURE:
            return {
                posts: [],
                loading: false,
                error: action.payload
            }
        case SET_POSTS_SUCCESS:
            return {
                posts: action.payload,
                loading: false,
                error: ''
            }
        default:
            return { ...state }
    }
}

export default postsRedcuer