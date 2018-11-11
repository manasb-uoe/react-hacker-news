import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { withRouter } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { NEWS_TYPES } from "./app";
import withStyles from '@material-ui/core/styles/withStyles'

const styles = {
    appBar: {
        margin: 0,
        padding: 0
    },
    tabs: {
        marginLeft: '10px'
    }
}

const HeaderWithoutRouterAndStyles = ({ type, history, classes }) => {
    const onTabSelected = (_, selectedTab) => {
        history.push("/" + selectedTab);
    };

    return (
        <AppBar className={classes.appBar} color="primary">
            <Toolbar>
                <Typography variant="title" color="inherit">
                    Hacker News
                </Typography>
                <Tabs className={classes.tabs} value={type} centered onChange={onTabSelected}>
                    {NEWS_TYPES.map(route => (
                        <Tab key={route} label={route} value={route} />
                    ))}
                </Tabs>
            </Toolbar>
        </AppBar>
    );
};

export const Header = withRouter(withStyles(styles)(HeaderWithoutRouterAndStyles));
