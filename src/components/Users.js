import React, { Component } from 'react'
import { USERS_URL } from './Constants'
import axios from 'axios'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from '@material-ui/core/Avatar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'

export class Users extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            isLoading: true

        }
    }
    componentDidMount = () => {
        axios.get(USERS_URL)
            .then(response => {
                this.setState({ users: response.data, isLoading: false })
            })
            .catch(err => {
                alert(err)
            })

    }
    render() {
        const { isLoading, users } = this.state
        return (
            <div>
                {
                    <>
                        {isLoading && <LinearProgress variant="query" color="primary" />}
                        <List
                            component="nav"
                            aria-labelledby="nested-list-subheader"
                            subheader={<Typography style={{ marginLeft: 20 }} variant="h5" component="h2">USERS LIST : {users.length}</Typography>}>
                            {
                                users.map(user => {
                                    return (
                                        <ListItem key={user.id} button component={Link} to={`/users/${user.id}`}>
                                            <ListItemIcon>
                                                <Avatar style={{ backgroundColor: '#3F51B5', color: 'white' }}>{user.name.charAt(0)}</Avatar>
                                            </ListItemIcon>
                                            <ListItemText primary={user.name} />
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </>
                }
            </div>
        )
    }
}

export default Users
