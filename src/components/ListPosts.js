import React from 'react'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import {HOCStyles} from '../HOCStyles'

function ListPosts(props) {
    return (
        <>
            {
                props.posts.map(post => {
                    return (
                        <Card key={post.id}  className={props.classes.UserShowCard}>
                            <CardActionArea component={Link} to={`/posts\\${post.id}`}>
                                <CardHeader color="textPrimary"
                                    subheader={`Title : ${post.title}`}
                                />
                                <CardContent>
                                    <Typography paragraph color="textSecondary">
                                        {post.body}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    )
                })
            }

        </>
    )
}
export default withStyles(HOCStyles)(ListPosts)
