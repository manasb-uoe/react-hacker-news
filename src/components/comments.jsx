import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import React, { useEffect, useContext } from "react";
import { Post } from "./posts";
import { HNStoreContext } from "../store";
import { observer } from "mobx-react";

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

const CommentsWithoutStyles = observer(({ classes, match }) => {
    const store = useContext(HNStoreContext);
    
    useEffect(
        () => {
            store.setItemId(match.params.itemId);
        },
        [match.path]
    );

    const renderComment = (comment, commentsSoFar = []) => {
        commentsSoFar.push(
            <Comment key={comment.id} comment={comment} />
        );
        comment.comments.forEach(c => renderComment(c, commentsSoFar));
        return commentsSoFar;
    };

    return (
        <Grid container className={classes.mainContainer}>
            <Grid item md={12} lg={8}>
                {store.commentsLoading && (
                    <div className={classes.centeredDiv}>
                        <CircularProgress />
                    </div>
                )}
                {!store.commentsLoading && store.selectedPost && (
                    <Post className={classes.post} post={store.selectedPost} />
                )}
                {!store.commentsLoading &&
                    store.comments.flatMap(comment => renderComment(comment))}
                {!store.commentsLoading && store.comments.length === 0 && (
                    <div className={classes.centeredDiv}>
                        No comments found :(
                    </div>
                )}
            </Grid>
        </Grid>
    );
});

export const Comments = withStyles(commentsStyles)(CommentsWithoutStyles);

const commentStyles = theme => ({
    commentContainer: {
        display: "flex",
        flexDirection: "row"
    },
    commentLevelLine: {
        borderLeft: "2px solid " + theme.palette.secondary.main,    
        marginRight: "10px"
    },
    card: {
        marginLeft: '7px'
    },
    cardContent: {
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
    return (
        <div className={classes.commentContainer}>
            {[...new Array(comment.level).keys()].map((_, index) => (
                <div key={index} className={classes.commentLevelLine} />
            ))}
            <div
                className={classes.card}
            >
                <div className={classes.cardContent}>
                    <div>
                        <span className={classes.user}>{comment.user}</span>
                        <span className={classes.time}>{comment.time_ago}</span>
                    </div>
                    <div
                        className={classes.content}
                        dangerouslySetInnerHTML={{ __html: comment.content }}
                    />
                </div>
            </div>
        </div>
    );
};

const Comment = withStyles(commentStyles)(CommentWithoutStyles);
