import React, { Component } from 'react'
import { POSTS_URL } from './Constants'
import axios from 'axios'
import ListPosts from './ListPosts'
import { Card, CardHeader } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
export class Posts extends Component {
    constructor(props) {
        super(props)

        this.state = {
            posts: [],
            isLoading: true

        }
    }
    componentDidMount = () => {
        axios.get(POSTS_URL)
            .then(response => {
                this.setState({ posts: response.data, isLoading: false })
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        const { isLoading, posts } = this.state
        return (
            <Card >
                {isLoading && <LinearProgress variant="query" color="primary" />}
                <CardHeader color="textPrimary"
                    title={`POSTS LIST : ${posts.length}`}
                />
                <ListPosts posts={posts} />
            </Card>
        )
    }
}

export default Posts
