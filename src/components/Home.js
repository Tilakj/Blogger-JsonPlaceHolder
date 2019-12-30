import React from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import { HOCStyles } from '../HOCStyles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
class Home extends React.Component {
    constructor() {
        super()
        this.state = {
            users: { data: [], isLoading: true },
            posts: { data: [], isLoading: true }

        }
    }
    getData = (baseUrl, service) => {
        axios.get(baseUrl + service)
            .then(response => {
                this.setState({ [service]: { data: response.data, isLoading: false } })
            })
    }
    componentDidMount = () => {
        const baseUrl = "http://jsonplaceholder.typicode.com/"
        this.getData(baseUrl, "users")
        this.getData(baseUrl, "posts")

    }
    render() {
        const { classes } = this.props;
        const { users, posts } = this.state
        return (
            <div className="row">
                <Typography style={{ marginLeft: 20 }} variant="h5"  component="h2">Dashboard</Typography>
                <Card className={`col-md-3 ${classes.card}`} >
                    {users.isLoading && <LinearProgress variant="query" color="primary" />}
                    <CardActionArea component={Link} to={'/users'}>
                        <CardContent >
                            {!users.isLoading && <h2 className={classes.paperText}>Users: {users.data.length}</h2>}
                        </CardContent>
                    </CardActionArea>
                </Card>
                <Card className={`col-md-3 ${classes.card}`}>
                    {users.isLoading && <LinearProgress variant="query" color="primary" />}
                    <CardActionArea  component={Link} to={'/posts'}>
                        <CardContent>
                            {!posts.isLoading && <h2 className={classes.paperText}>Posts: {posts.data.length}</h2>}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div >

        )

    }
}

export default withStyles(HOCStyles)(Home);
