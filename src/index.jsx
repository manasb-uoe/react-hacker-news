import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/app";

const root = document.createElement("div");
root.id = "root";
document.body.appendChild(root);

document.body.style.fontFamily = 'Roboto, sans-serif';
document.body.style.backgroundColor = '#eee';
document.body.style.margin = '64px 0 0 0';

ReactDOM.render(<App />, document.getElementById("root"));
