import React, { useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { fetchComments } from "../api";
import { Post } from "./posts";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import * as classnames from 'classnames';

const commentsStyles = {
    mainContainer: {
        padding: "10px"
    },
    post: {
        marginBottom: "10px"
    },
    centeredDiv: {
        textAlign: "center"
    }
};

const CommentsWithoutStyles = ({ classes, comments, match, loadComments }) => {
    useEffect(
        () => {
            loadComments(match.params.itemId);
        },
        [match.path]
    );

    const renderComment = (comment, commentsSoFar = []) => {
        commentsSoFar.push(<Comment key={comment.id} comment={comment} />);
        comment.comments.forEach(c => renderComment(c, commentsSoFar));
        return commentsSoFar;
    };

    return (
        <Grid container justify="center" className={classes.mainContainer}>
            <Grid item md={12} lg={8}>
                {comments.loading && (
                    <div className={classes.centeredDiv}>
                        <CircularProgress />
                    </div>
                )}
                {!comments.loading && comments.post && (
                    <Post className={classes.post} post={comments.post} />
                )}
                {!comments.loading && comments.items.flatMap(comment => renderComment(comment))}
                {!comments.loading && comments.items.length === 0 && <div className={classes.centeredDiv}>No comments found :(</div>}
            </Grid>
        </Grid>
    );
};

export const Comments = withStyles(commentsStyles)(CommentsWithoutStyles);

const commentStyles = theme => ({
    card: {
        borderRadius: 0,
        borderBottom: "1px solid #eee"
    },
    cardLevel0: {
        borderLeft: '2px solid ' + theme.palette.primary.main
    },
    cardContent: {
        paddingTop: "15px",
        paddingBottom: "0 !important"
    },
    content: {
        "& a": {
            color: theme.palette.primary.main
        }
    },
    user: {
        color: theme.palette.secondary.main
    },
    time: {
        marginLeft: "10px",
        color: theme.palette.text.secondary
    }
});

const CommentWithoutStyles = ({ comment, classes }) => {
    const calculateLeftMargin = level => {
        return +level * 15;
    };
    return (
        <React.Fragment>
            <Card
                className={classnames(classes.card, {[classes.cardLevel0]: comment.level === 0})}
                style={{
                    marginLeft: calculateLeftMargin(comment.level) + "px"
                }}
            >
                <CardContent className={classes.cardContent}>
                    <div>
                        <span className={classes.user}>{comment.user}</span>
                        <span className={classes.time}>{comment.time_ago}</span>
                    </div>
                    <div
                        className={classes.content}
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

const Comment = withStyles(commentStyles)(CommentWithoutStyles);
