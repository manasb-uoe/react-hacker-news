import React, { useState } from "react";
import { fetchPosts } from "../api";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import { Header } from "./header";
import { Posts } from "./posts";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

export const NEWS_TYPES = ["best", "newest"];

const theme = createMuiTheme({
    palette: {
        primary: { main: blue[600] },
        secondary: { main: red[500] }
    }
});

export const App = () => {
    const [posts, setPosts] = useState({
        type: "best",
        items: [],
        loading: false
    });

    const updateType = async type => {
        setPosts({ type, items: [], loading: true });
        const fetchedPosts = await fetchPosts(type);
        setPosts({ type, items: fetchedPosts, loading: false });
    };

    const routes = NEWS_TYPES.map(type => (
        <Route
            key={type}
            path={"/" + type}
            exact
            render={props => (
                <Posts {...props} posts={posts} updateType={updateType} />
            )}
        />
    ));

    return (
        <MuiThemeProvider theme={theme}>
            <HashRouter>
                <React.Fragment>
                    <Header type={posts.type} updateType={updateType} />
                    <Switch>
                        {routes}
                        <Redirect to="/news" />
                    </Switch>
                </React.Fragment>
            </HashRouter>
        </MuiThemeProvider>
    );
};
