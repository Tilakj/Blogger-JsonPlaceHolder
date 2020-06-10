import React, { Component } from 'react'
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
import ListPost from './ListPosts'
import { connect } from 'react-redux'
import { getUserByIdSelector, getUserPostsSelector } from '../redux/selectors/selectors'
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

export class UserShowPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            expanded: true,
        }
    }

    handleExpandClick = () => {
        const expanded = !this.state.expanded
        this.setState({ expanded });
    };


    render() {

        const { isLoading, user, userPosts } = this.props
        return (
            <>
                <Typography style={{ marginLeft: 20 }} variant="h5" >User Show Page</Typography>
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
                <Button variant="contained" color="primary" style={{ marginLeft: 20, marginTop: 20 }} component={Link} to={`/users`}>Show All Users</Button>
            </>
        )
    }
}

const mapStatetoProps = (state, props) => {
    return {
        user: getUserByIdSelector(state.users.users, Number(props.match.params.id)),
        userPosts: getUserPostsSelector(state.posts.posts, Number(props.match.params.id)),
        isLoading: state.posts.loading || state.users.loading
    }
}

export default connect(mapStatetoProps)(withStyles(HOCStyles)(UserShowPage))

