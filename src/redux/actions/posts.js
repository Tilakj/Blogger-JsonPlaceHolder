import { SET_POSTS_FAILURE, SET_POSTS_REQUEST, SET_POSTS_SUCCESS } from '../actionTypes/postTypes'
import axios from '../../config/axios'

export const setPostsRequest = () => {
    return {
        type: SET_POSTS_REQUEST
    }
}
export const setPostsFailure = (err) => {
    return {
        type: SET_POSTS_FAILURE,
        payload: err
    }
}

export const setPostsSuccess = (posts) => {
    return {
        type: SET_POSTS_SUCCESS,
        payload: posts
    }
}

export const startFetchPosts = () => {
    return (dispatch) => {
        dispatch(setPostsRequest())
        axios.get('/posts')
            .then(res => {
                dispatch(setPostsSuccess(res.data))
            })
            .catch(err => {
                dispatch(setPostsFailure(err))
            })

    }
}