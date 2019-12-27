import React, { Component } from 'react'
import Axios from 'axios'
import { POSTS_URL, USERS_URL, COMMENTS_URL } from './Constants'
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


export class PostShowPage extends Component {
    constructor() {
        super()

        this.state = {
            user: {},
            post: {},
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

        const postId = Number(this.props.match.params.id.substr(1))
        Axios.get(POSTS_URL + `\\${postId}`)
            .then(response => {
                this.setState({ post: response.data }, () => {


                    Axios.get(USERS_URL + `\\${response.data.userId}`)
                        .then(response => {
                            this.setState({ user: response.data }, () => {


                                Axios.get(COMMENTS_URL)
                                    .then(response => {
                                        const postComments = response.data.filter(comment => comment.postId === postId)
                                        this.setState({ postComments,isLoading:false })
                                    })
                                    .catch(err => {
                                        alert(err)
                                    })

                            })
                        })
                        .catch(err => {
                            alert(err)
                        })
                })

            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        const { isLoading, post, user, postComments } = this.state
        return (
            <div>
                <Typography style={{ marginLeft: 20 }} variant="title"  component="h2">Post Show Page</Typography>
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
                                [this.props.classes.expandOpen]: this.state.expanded,
                            })}
                            onClick={this.handleExpandClick}
                            aria-expanded={this.state.expanded}
                            aria-label="show more">

                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>

                    <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                        <ul style={{ padding:'0px 30px',paddingBottom: '30px' ,marginLeft:20 }}>
                            {
                                postComments.map(comment => {
                                    return <li key={comment.id}>{comment.body}</li>
                                })
                            }
                        </ul>
                    </Collapse>
                </Card>
                <Button variant="contained" color="primary" style={{marginLeft:20, marginTop: 20 }}component={Link}to={`/users\\${user.id}`}>More posts of {user.name}</Button>

            </div>
        )
    }
}

export default withStyles(HOCStyles)(PostShowPage);
