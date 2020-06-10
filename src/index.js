import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux';
import configureStore from './redux/store/configureStore';
import { startFetchUsers } from './redux/actions/users';
import { startFetchPosts } from './redux/actions/posts';
// import { startGetPosts } from './actions/posts';

const store = configureStore()

store.dispatch(startFetchUsers())
store.dispatch(startFetchPosts())

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))

