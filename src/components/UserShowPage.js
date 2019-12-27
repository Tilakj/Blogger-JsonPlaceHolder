import React, { Component } from 'react'
import Axios from 'axios'
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
import { USERS_URL } from './Constants'
import { POSTS_URL } from './Constants'
import ListPost from './ListPosts'



export class UserShowPage extends Component {
    constructor() {
        super()

        this.state = {
            user: {},
            userPosts: [],
            expanded: true,
            isLoading: true
        }
    }

    handleExpandClick = () => {
        const expanded = !this.state.expanded
        this.setState({ expanded });
    };
    componentDidMount = () => {
        const id = this.props.match.params.id
        Axios.get(USERS_URL + `\\${id}`)
            .then(response => {
                this.setState({ user: response.data, isLoading: false }, () => {
                    Axios.get(POSTS_URL)
                        .then(response => {
                            const userPosts = response.data.filter(post => post.userId === this.state.user.id)
                            this.setState({ userPosts })
                        })
                })
            })
            .catch(err => {
                alert(err)
            })
    }

    render() {
        const { isLoading, user, userPosts } = this.state
        return (
            <>
                <Typography style={{ marginLeft: 20 }} variant="title" component="h2">User Show Page</Typography>
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
                    <CardActions disableSpacing>
                        <Typography style={{ marginLeft: 20 }} variant="body2" color="textPrimary" component="h2"> Posts by {user.name}</Typography>
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
                        <ListPost posts={userPosts} />
                    </Collapse>

                </Card>
            </>
        )
    }
}

export default withStyles(HOCStyles)(UserShowPage);

