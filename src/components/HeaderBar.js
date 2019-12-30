import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { useStyles } from '../styles'

function HeaderBar(props) {
    const classes = useStyles();
    const { handleDrawerOpen, open } = props
    return (
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>

            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, {
                        [classes.hide]: open,
                    })}>

                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap>
                    Blogger
             </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default HeaderBar
