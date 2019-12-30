import React from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'
import { useStyles } from '../styles'


function SideMenuBar(props) {
    const classes = useStyles();
    const theme = useTheme();
    const { open, handleDrawerClose, menus } = props
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}>
            <div className={classes.toolbar}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </div>
            <Divider />
            <List>
                {
                    menus.map(menu => {
                        return (
                            <ListItem button key={menu.id} component={Link} to={menu.link}>
                                <ListItemIcon>{menu.icon}</ListItemIcon>
                                <ListItemText primary={menu.name} />
                            </ListItem>
                        )
                    })
                }
            </List>
            <Divider />
        </Drawer>
    )
}

export default SideMenuBar
