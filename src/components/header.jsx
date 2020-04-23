import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import * as React from "react";
import { withRouter } from "react-router-dom";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { NEWS_TYPES } from "./app";
import withStyles from "@material-ui/core/styles/withStyles";
import { HNStoreContext } from "../store";
import { observer } from "mobx-react";
import { runInAction } from "mobx";

const styles = {
  appBar: {
    margin: 0,
    padding: 0,
  },
  tabs: {
    marginLeft: "10px",
  },
};

const HeaderWithoutRouterAndStyles = observer(({ history, classes }) => {
  const store = React.useContext(HNStoreContext);

  const onTabSelected = (_, selectedTab) => {
    history.push("/" + selectedTab);
    runInAction(() => {
        store.setType(selectedTab);
        store.setPage(1);
    })
  };

  return (
    <AppBar className={classes.appBar} color="primary">
      <Toolbar>
        <Typography variant="subtitle1" color="inherit">
          Hacker News - React Hooks API
        </Typography>
        <Tabs
          className={classes.tabs}
          value={store.type}
          centered
          onChange={onTabSelected}
        >
          {NEWS_TYPES.map((route) => (
            <Tab key={route} label={route} value={route} />
          ))}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
});

export const Header = withRouter(
  withStyles(styles)(HeaderWithoutRouterAndStyles)
);
