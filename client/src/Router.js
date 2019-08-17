import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./components/Home";
import Display from "./components/Display";
class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/display" component={Display} />
      </Switch>
    );
  }
}
export default Router;
