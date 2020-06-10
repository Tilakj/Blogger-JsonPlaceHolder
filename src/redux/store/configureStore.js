import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension';
import usersReducer from '../reducers/usersReducer'
import postsRedcuer from '../reducers/postsReducer';

const configureStore = () => {
    const store = createStore(combineReducers({
        users: usersReducer,
        posts: postsRedcuer
    }), composeWithDevTools(applyMiddleware(thunk, logger)))
    return store
}

export default configureStore