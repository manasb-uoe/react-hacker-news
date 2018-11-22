import React, { useEffect, useRef } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ChatBubble from "@material-ui/icons/ChatBubbleOutline";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link } from "react-router-dom";

const postsStyles = {
    postsContainer: {
        padding: "10px"
    },
    centeredDiv: {
        textAlign: "center"
    },
    post: {
        marginBottom: "5px"
    },
    navigationButtonsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "10px 0"
    }
};

const PostsWithoutStyles = ({
    posts,
    loadPosts,
    match,
    location,
    history,
    classes
}) => {
    const page =
        parseInt(new URLSearchParams(location.search).get("page")) ||
        posts.page;

    useEffect(
        () => {
            const type = match.path.startsWith("/")
                ? match.path.slice(1)
                : match.path;

            if (
                posts.items.length === 0 ||
                type !== posts.type ||
                page !== posts.page
            ) {
                loadPosts(type, page);
            }
        },
        [match.path, location.search]
    );

    const onPageNavigationClick = page => {
        history.push({
            pathname: location.path,
            search: "?page=" + page
        });
    };

    const renderPosts = () => {
        if (posts.loading) {
            return <CircularProgress />;
        } else if (posts.items.length == 0) {
            return <div className={classes.centeredDiv}>No posts found :(</div>;
        } else {
            return (
                <Grid item md={12} lg={8}>
                    {posts.items.map(post => (
                        <Post
                            className={classes.post}
                            key={post.id}
                            post={post}
                        />
                    ))}
                    <div className={classes.navigationButtonsContainer}>
                        <Button
                            onClick={e => onPageNavigationClick(page - 1)}
                            fullWidth
                            disabled={posts.page === 1}
                        >
                            Previous
                        </Button>
                        <Button
                            onClick={e => onPageNavigationClick(page + 1)}
                            fullWidth
                        >
                            Next
                        </Button>
                    </div>
                </Grid>
            );
        }
    };

    {
        posts.loading && (
            <div className={classes.centeredDiv}>
                <CircularProgress />
            </div>
        );
    }
    {
        !posts.loading && posts.items.length === 0 && (
            <div className={classes.centeredDiv}>No posts found :(</div>
        );
    }
    {
        !postMessage.loading && posts.items.length > 0 && (
            <Grid item md={12} lg={8}>
                {posts.items.map(post => (
                    <Post className={classes.post} key={post.id} post={post} />
                ))}
            </Grid>
        );
    }

    return (
        <div className={classes.postsContainer}>
            <Grid container justify="center">
                {renderPosts()}
            </Grid>
        </div>
    );
};

export const Posts = withStyles(postsStyles)(PostsWithoutStyles);

const postStyles = theme => ({
    cardContentWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    centeredFlexRow: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    points: {
        fontSize: "130%",
        width: "70px",
        color: theme.palette.secondary.main
    },
    title: {
        fontSize: "120%",
        color: theme.palette.text.primary
    },
    subtitle: {
        color: theme.palette.text.secondary
    },
    link: {
        textDecoration: "none"
    },
    commentsWrapper: {
        textAlign: "center"
    },
    numComments: {
        color: theme.palette.text.secondary,
        marginTop: "-10px",
        fontSize: "90%"
    },
    commentsLink: {
        textDecoration: "none"
    }
});

const PostWithoutStyles = ({ post, classes, className }) => {
    return (
        <Card className={className}>
            <CardContent>
                <div className={classes.cardContentWrapper}>
                    <div className={classes.centeredFlexRow}>
                        <div className={classes.points}>{post.points}</div>
                        <a
                            href={post.url}
                            className={classes.link}
                            target="_blank"
                        >
                            <div className={classes.title}>{post.title}</div>
                            <div className={classes.subtitle}>
                                {post.time_ago} by {post.user} | {post.domain}
                            </div>
                        </a>
                    </div>
                    <div className={classes.commentsWrapper}>
                        <IconButton>
                            <Link
                                className={classes.commentsLink}
                                to={"/item/" + post.id}
                            >
                                <ChatBubble color="secondary" />
                            </Link>
                        </IconButton>
                        <div className={classes.numComments}>
                            {post.comments_count}
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export const Post = withStyles(postStyles)(PostWithoutStyles);
