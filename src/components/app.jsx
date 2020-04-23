import React, { useState } from "react";
import { fetchPosts, fetchComments } from "../api";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { Header } from "./header";
import { Posts } from "./posts";
import { Comments } from "./comments";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import { HNStore } from "../store";
export const NEWS_TYPES = ["news", "best", "newest"];

const theme = createMuiTheme({
  palette: {
    primary: { main: blue[600] },
    secondary: { main: red[500] },
  },
});

export const App = () => {
  const [comments, setComments] = useState({
    post: undefined,
    items: [],
    loading: false,
  });

  const loadComments = async (id) => {
    setComments({ post: undefined, items: [], loading: true });
    const fetchedComments = await fetchComments(id);
    setComments({
      post: fetchedComments,
      items: fetchedComments.comments,
      loading: false,
    });
  };

  const routes = NEWS_TYPES.map((type) => (
    <Route
      key={type}
      path={"/" + type}
      exact
      render={(props) => (
        <Posts {...props} />
      )}
    />
  ));

  return (
    <MuiThemeProvider theme={theme}>
      <HashRouter>
        <React.Fragment>
          <Header />
          <Switch>
            {routes}
            <Route
              path="/item/:itemId"
              render={(props) => (
                <Comments
                  {...props}
                  comments={comments}
                  loadComments={loadComments}
                />
              )}
            />
            <Redirect to="/news" />
          </Switch>
        </React.Fragment>
      </HashRouter>
    </MuiThemeProvider>
  );
};
