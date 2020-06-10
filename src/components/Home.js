import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import { HOCStyles } from '../HOCStyles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
const Home = props => {


    const { classes, users, posts } = props;
    return (
        <div className="row">
            <Typography style={{ marginLeft: 20 }} variant="subtitle1">Dashboard</Typography>
            <Card className={`col-md-3 ${classes.card}`} >
                {users.loading && <LinearProgress variant="query" color="primary" />}
                <CardActionArea component={Link} to={'/users'}>
                    <CardContent >
                        {!users.loading && <h2 className={classes.paperText}>Users: {users.users.length}</h2>}
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={`col-md-3 ${classes.card}`}>
                {users.loading && <LinearProgress variant="query" color="primary" />}
                <CardActionArea component={Link} to={'/posts'}>
                    <CardContent>
                        {!posts.loading && <h2 className={classes.paperText}>Posts: {posts.posts.length}</h2>}
                    </CardContent>
                </CardActionArea>
            </Card>
        </div >

    )

}

const mapStatetoProps = (state) => {
    return {
        users: state.users,
        posts: state.posts
    }
}

export default connect(mapStatetoProps)(withStyles(HOCStyles)(Home));
