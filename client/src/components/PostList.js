import React, { useEffect } from "react";
import { listPosts } from "../actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    CardContent, Typography,
    Grid, Card, CardHeader, Container, CardActions, Button, Paper, Box, CardMedia
} from '@mui/material';

import "../styles/Landing.css";

const PostList = () => {
    const dispatch = useDispatch();

    const postList = useSelector(state => state.postList);
    const { loading, posts, error } = postList

    useEffect(() => {
        dispatch(listPosts());
    }, [dispatch])

    return (
        <>
            <div className="listBanner" >
                <Typography variant="h4" color="text.secondary" sx={{
                    textAlign: "center", pt: 5
                }}>
                    Add your own stories here
                </Typography>
                <Box textAlign='center'>
                    <Link to="/addPost" className="btn btn-sm btn-success my-2" >
                        Add Post
                    </Link>
                </Box>
            </div>

            <Grid container margin={2} spacing={2} alignItems="stretch" >
                {loading && 'Loading...'}
                {posts ? posts.map((post) => (
                    <Grid item xs={12} md={6} lg={4}>
                        <Card sx={{ maxWidth: 345, display: 'flex', justiyContent: 'space-between', flexDirection: 'column' }} >
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://images.pexels.com/photos/974198/pexels-photo-974198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"

                            />
                            <CardHeader
                                title={post.title}
                                subheader={post.postedDate.substring(0, 10)}
                            />
                            {/* <CardContent>
                                    <Typography variant="body2" color="text.secondary" sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 3,
                                    }}>
                                        {post.description}
                                    </Typography>

                                </CardContent> */}
                            <CardActions>
                                <Button size="small">
                                    <Link to={`/postList/${post._id}`} style={{ textDecoration: 'none' }}>
                                        Read more
                                    </Link>
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))
                    : <h1>No posts found</h1>
                }

            </Grid>
        </>
    )
}

export default PostList;