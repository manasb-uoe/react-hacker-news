import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import ChatBubble from "@material-ui/icons/ChatBubbleOutline";
import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { HNStoreContext } from "../store";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const postsStyles = {
  postsContainer: {
    padding: "10px",
  },
  centeredDiv: {
    textAlign: "center",
  },
  navigationButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "10px 0",
  },
};

const PostsWithoutStyles = observer(({ match, location, history, classes }) => {
  const store = useContext(HNStoreContext);

  const page = parseInt(new URLSearchParams(location.search).get("page")) || 1;

  useEffect(() => {
    const type = match.path.startsWith("/") ? match.path.slice(1) : match.path;

    if (
      store.posts.length === 0 ||
      type !== store.type ||
      page !== store.page
    ) {
      runInAction(() => {
        store.setPage(page);
        store.setType(type);
      });
    }
  }, [match.path, location.search]);

  const onPageNavigationClick = (page) => {
    history.push({
      pathname: location.path,
      search: "?page=" + page,
    });
  };

  const renderPosts = () => {
    if (store.postsLoading) {
      return <CircularProgress />;
    } else if (store.posts.length == 0) {
      return <div className={classes.centeredDiv}>No posts found :(</div>;
    } else {
      return (
        <Grid item md={12} lg={8}>
          {store.posts.map((post) => (
            <Post
              className={classes.post}
              key={post.id}
              post={post}
              history={history}
            />
          ))}
          <div className={classes.navigationButtonsContainer}>
            <Button
              onClick={(e) => onPageNavigationClick(page - 1)}
              fullWidth
              disabled={store.page === 1}
            >
              Previous
            </Button>
            <Button onClick={(e) => onPageNavigationClick(page + 1)} fullWidth>
              Next
            </Button>
          </div>
        </Grid>
      );
    }
  };

  {
    store.postsLoading && (
      <div className={classes.centeredDiv}>
        <CircularProgress />
      </div>
    );
  }
  {
    !store.postsLoading && store.posts.length === 0 && (
      <div className={classes.centeredDiv}>No posts found :(</div>
    );
  }
  {
    !postMessage.loading && store.posts.length > 0 && (
      <Grid item md={12} lg={8}>
        {store.posts.map((post) => (
          <Post className={classes.post} key={post.id} post={post} />
        ))}
      </Grid>
    );
  }

  return (
    <div className={classes.postsContainer}>
      <Grid container>{renderPosts()}</Grid>
    </div>
  );
});

export const Posts = withStyles(postsStyles)(PostsWithoutStyles);

const postStyles = (theme) => ({
  cardContentWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "5px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
    },
  },
  centeredFlexRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  points: {
    fontSize: "130%",
    width: "70px",
    color: theme.palette.secondary.main,
  },
  title: {
    fontSize: "120%",
    color: theme.palette.text.primary,
  },
  subtitle: {
    color: theme.palette.text.secondary,
  },
  link: {
    textDecoration: "none",
  },
  commentsWrapper: {
    textAlign: "center",
  },
  numComments: {
    color: theme.palette.text.secondary,
    marginTop: "-10px",
    fontSize: "90%",
  },
  commentsLink: {
    textDecoration: "none",
  },
});

const PostWithoutStyles = ({ post, classes }) => {
  return (
    <div className={classes.cardContentWrapper}>
      <div className={classes.centeredFlexRow}>
        <div className={classes.points}>{post.points}</div>
        <a href={post.url} target="_blank" className={classes.link}>
          <div className={classes.title}>{post.title}</div>
          <div className={classes.subtitle}>
            {post.time_ago} by {post.user} | {post.domain}
          </div>
        </a>
      </div>
      <div className={classes.commentsWrapper}>
        <Link to={"/item/" + post.id}>
          <IconButton>
            <ChatBubble color="secondary" />
          </IconButton>
        </Link>
        <div className={classes.numComments}>{post.comments_count}</div>
      </div>
    </div>
  );
};

export const Post = withStyles(postStyles)(PostWithoutStyles);
