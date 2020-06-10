import React from 'react'
import ListPosts from './ListPosts'
import { Card, CardHeader } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { connect } from 'react-redux'
const Posts = props => {
    const { loading, posts, error } = props.posts
    return (
        <Card>
            {loading ? <LinearProgress variant="query" color="primary" /> :
                <>
                    {error && window.alert(error)}    {/* use toast */}
                    <CardHeader color="textPrimary"
                        title={`POSTS LIST : ${posts.length}`}
                    />
                    <ListPosts posts={posts} />
                </>
            }
        </Card>
    )

}


const mapStateToProps = (state) => {
    return {
        posts: state.posts
    }
}
export default connect(mapStateToProps)(Posts)
