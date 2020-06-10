import React from 'react'
import { connect } from 'react-redux'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from '@material-ui/core/Avatar'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link } from 'react-router-dom'

const Users = (props) => {
    const { loading, users, error } = props.users
    return (
        <div >
            {
                <>
                    {loading && <LinearProgress variant="query" color="primary" />}
                    {error && window.alert(error)}    {/* use toast */}
                    <List
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                        subheader={<h3>USERS LIST : {users.length}</h3>}>
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

const mapStatetoProps = state => {
    return {
        users: state.users
    }
}

export default connect(mapStatetoProps)(Users)
