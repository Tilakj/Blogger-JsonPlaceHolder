import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'

import Home from './Home'
import Users from './Users'
import Posts from './Posts'
import UserShowPage from './UserShowPage'
import PostShowPage from './PostShowPage'
import { useStyles } from '../styles'
import { Redirect } from 'react-router-dom';
import HeaderBar from './HeaderBar';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import SideMenuBar from './SideMenuBar';


export default function App() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const menus = [
        {
            id: 1,
            name: 'Dashboard',
            link: '/home',
            icon: <DashboardIcon />
        },
        {
            id: 2,
            name: 'Users',
            link: '/users',
            icon: <PersonIcon />
        },
        {
            id: 3,
            name: 'Posts',
            link: '/posts',
            icon: <MailIcon />
        },
    ]
    return (
        <div className={classes.root}>
            <BrowserRouter>
                <HeaderBar open={open} handleDrawerOpen={handleDrawerOpen} />
                <SideMenuBar open={open} handleDrawerClose={handleDrawerClose} menus={menus} />
                <main className={classes.content}>
                    <div className={classes.toolbar} />

                    <Route path="/home" component={Home} />
                    <Route path="/users" component={Users} exact={true} />
                    <Route path="/posts" component={Posts} exact={true} />
                    <Route path="/users:id" component={UserShowPage} />
                    <Route path="/posts:id" component={PostShowPage} />


                    <Route render={() => <Redirect to={{ pathname: "/home" }} />} />

                </main>
            </BrowserRouter>
        </div >

    );
}
