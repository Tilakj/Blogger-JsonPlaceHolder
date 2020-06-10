import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress'
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core/styles';
import { HOCStyles } from '../HOCStyles'
import CardContent from '@material-ui/core/CardContent';
import { Button } from '@material-ui/core';
import { getUserByIdSelector, getPostByIdSelector } from '../redux/selectors/selectors';
import axios from '../config/axios';
import { connect } from 'react-redux'


export class PostShowPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: true,
            postComments: [],
            isLoading: true
        }
    }

    handleExpandClick = () => {
        const expanded = !this.state.expanded
        this.setState({ expanded });
    };
    componentDidMount = () => {
        axios.get('/comments')
            .then(response => {
                const postComments = response.data.filter(comment => comment.postId === this.props.post.id)
                this.setState({ postComments, isLoading: false })
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        const { isLoading, postComments, expanded } = this.state
        const { post, user } = this.props
        return (
            <div>
                <Typography style={{ marginLeft: 20 }} variant="h5"  >Post Show Page</Typography>
                {isLoading && <LinearProgress variant="query" color="primary" />}
                <Card raised className={this.props.classes.UserShowCard}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label={user.name} className={this.props.classes.avatar}>
                            </Avatar>
                        }
                        title={user.name}
                        subheader={user.email}
                    />
                    <CardContent>
                        <Typography style={{ marginLeft: 20 }} variant="body2" color="textPrimary" component="h2">Title: {post.title}</Typography><br />
                        <Typography style={{ marginLeft: 20 }} variant="body2" color="textPrimary" component="h2">Body: {post.body}</Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Typography style={{ marginLeft: 20 }} variant="body2" color="textPrimary" component="h2">Comments</Typography>
                        <IconButton
                            className={clsx(this.props.classes.expand, {
                                [this.props.classes.expandOpen]: expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more">

                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <ul style={{ padding: '0px 30px', paddingBottom: '30px', marginLeft: 20 }}>
                            {
                                postComments.map(comment => {
                                    return <li key={comment.id}>{comment.body}</li>
                                })
                            }
                        </ul>
                    </Collapse>
                </Card>
                <Button variant="contained" color="primary" style={{ marginLeft: 20, marginTop: 20 }} component={Link} to={`/users/${user.id}`}>More posts of {user.name}</Button>

            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const post = getPostByIdSelector(state.posts.posts, Number(props.match.params.id))
    console.log(post)
    return {
        post,
        user: getUserByIdSelector(state.users.users, post.userId),
    }

}
export default connect(mapStateToProps)(withStyles(HOCStyles)(PostShowPage));
